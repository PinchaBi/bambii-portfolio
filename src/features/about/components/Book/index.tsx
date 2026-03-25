import { useEffect, useMemo, useRef, useState } from "react";

import { useCursor, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { easing } from "maath";
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  MathUtils,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Uint16BufferAttribute,
  Vector3,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";

import { pageAtom, pages } from "../../constants";

// ─── Constants ───

const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.05;
const turningCurveStrength = 0.05;

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

// ─── Geometry setup ───

const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2,
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes: number[] = [];
const skinWeights: number[] = [];

for (let i = 0; i < position.count; i++) {
  vertex.fromBufferAttribute(position, i);
  const x = vertex.x;
  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;
  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndexes, 4),
);
pageGeometry.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4),
);

const whiteColor = new Color("white");
const emissiveColor = new Color("orange");

const pageMaterials = [
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: "#111" }),
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: whiteColor }),
];

pages.forEach((page) => {
  useTexture.preload(`/images/about/${page.front}.png`);
  useTexture.preload(`/images/about/${page.back}.png`);
  useTexture.preload(`/images/about/pattern-cover.png`);
});

// ─── Types ───

type PageData = (typeof pages)[number];

type PageProps = PageData & {
  number: number;
  page: number;
  opened: boolean;
  bookClosed: boolean;
  [key: string]: unknown; // allow passthrough group props
};

// ─── Page component ───

const Page = ({
  number,
  front,
  back,
  page,
  opened,
  bookClosed,
  ...props
}: PageProps) => {
  const [picture, picture2, pictureRoughness] = useTexture(
    [
      `/images/about/${front}.png`,
      `/images/about/${back}.png`,
      ...(number === 0 || number === pages.length - 1
        ? [`/images/about/pattern-cover.png`]
        : []),
    ],
    (textures) => {
      const arr = Array.isArray(textures) ? textures : [textures];
      arr[0].colorSpace = SRGBColorSpace;
      if (arr[1]) arr[1].colorSpace = SRGBColorSpace;
    },
  );

  const group = useRef<Group>(null);
  const turnedAt = useRef<number>(0);
  const lastOpened = useRef<boolean>(opened);
  const skinnedMeshRef = useRef<SkinnedMesh>(null!);

  const manualSkinnedMesh = useMemo(() => {
    const bones: Bone[] = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      const bone = new Bone();
      bones.push(bone);
      bone.position.x = i === 0 ? 0 : SEGMENT_WIDTH;
      if (i > 0) {
        bones[i - 1].add(bone);
      }
    }
    const skeleton = new Skeleton(bones);

    const materials = [
      ...pageMaterials,
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture,
        ...(number === 0
          ? { roughnessMap: pictureRoughness }
          : { roughness: 0.5 }),
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture2,
        ...(number === pages.length - 1
          ? { roughnessMap: pictureRoughness }
          : { roughness: 0.7 }),
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
    ];

    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);
    return mesh;
  }, [number, picture, picture2, pictureRoughness]);

  const [, setPage] = useAtom(pageAtom);
  const [highlighted, setHighlighted] = useState(false);
  useCursor(highlighted);

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current) return;

    const mat = skinnedMeshRef.current.material as MeshStandardMaterial[];
    const emissiveIntensity = highlighted ? 0.22 : 0;
    mat[4].emissiveIntensity = mat[5].emissiveIntensity = MathUtils.lerp(
      mat[4].emissiveIntensity,
      emissiveIntensity,
      0.1,
    );

    if (lastOpened.current !== opened) {
      turnedAt.current = +new Date();
      lastOpened.current = opened;
    }

    let turningTime = Math.min(400, +new Date() - turnedAt.current) / 400;
    turningTime = Math.sin(turningTime * Math.PI);

    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) {
      targetRotation += degToRad(number * 0.8);
    }

    const bones = skinnedMeshRef.current.skeleton.bones;
    for (let i = 0; i < bones.length; i++) {
      const target = i === 0 ? group.current! : bones[i];

      const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
      const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
      const turningIntensity =
        Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;

      let rotationAngle =
        insideCurveStrength * insideCurveIntensity * targetRotation -
        outsideCurveStrength * outsideCurveIntensity * targetRotation +
        turningCurveStrength * turningIntensity * targetRotation;

      let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);

      if (bookClosed) {
        if (i === 0) {
          rotationAngle = targetRotation;
          foldRotationAngle = 0;
        } else {
          rotationAngle = 0;
          foldRotationAngle = 0;
        }
      }

      easing.dampAngle(
        target.rotation,
        "y",
        rotationAngle,
        easingFactor,
        delta,
      );

      const foldIntensity =
        i > 8
          ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
          : 0;

      easing.dampAngle(
        target.rotation,
        "x",
        foldRotationAngle * foldIntensity,
        easingFactorFold,
        delta,
      );
    }
  });

  return (
    <group
      {...props}
      ref={group}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHighlighted(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHighlighted(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setPage(opened ? number : number + 1);
        setHighlighted(false);
      }}
    >
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />
    </group>
  );
};

// ─── Book component ───

type BookProps = {
  [key: string]: unknown;
};

export const Book = ({ ...props }: BookProps) => {
  const [page] = useAtom(pageAtom);
  const [delayedPage, setDelayedPage] = useState(page);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const goToPage = () => {
      setDelayedPage((delayedPage) => {
        if (page === delayedPage) {
          return delayedPage;
        }
        timeout = setTimeout(
          () => goToPage(),
          Math.abs(page - delayedPage) > 2 ? 50 : 150,
        );
        return page > delayedPage ? delayedPage + 1 : delayedPage - 1;
      });
    };

    goToPage();
    return () => clearTimeout(timeout);
  }, [page]);

  return (
    <group {...props} rotation-y={-Math.PI / 2}>
      {[...pages].map((pageData, index) => (
        <Page
          key={index}
          page={delayedPage}
          number={index}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === pages.length}
          {...pageData}
        />
      ))}
    </group>
  );
};
