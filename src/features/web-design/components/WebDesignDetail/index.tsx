import { Box, Stack, Typography } from "@mui/material";

import Wrapper from "@/components/layout/Wrapper";

import { webDesignList } from "../../constants";
import {
  BlindView,
  CUConnex,
  DentaSuit,
  FlickFinder,
  Horoscope,
  SermKrangKit,
  VeranaPress,
} from "./displayImage";

type WebDesignDetailProps = {
  id: string;
};

const WebDesignDetail = ({ id }: WebDesignDetailProps) => {
  // --------------------------- Hooks ---------------------------
  //region Hooks

  const webDesignId = Number(id ?? 1);
  const {
    title,
    subTitle,
    constraints,
    solutions,
    keyThinkings,
    outcome,
    images,
  } = webDesignList[webDesignId];

  // --------------------------- Renders ---------------------------
  //region Renders

  const renderImages = () => {
    switch (webDesignId) {
      case 1: {
        return <DentaSuit images={images} />;
      }
      case 2: {
        return <VeranaPress images={images} />;
      }
      case 3: {
        return <CUConnex images={images} />;
      }
      case 4: {
        return <Horoscope images={images} />;
      }
      case 5: {
        return <SermKrangKit images={images} />;
      }
      case 6: {
        return <FlickFinder images={images} />;
      }
      case 7: {
        return <BlindView images={images} />;
      }
      default:
        return <DentaSuit images={images} />;
    }
  };

  return (
    <Wrapper alignItems="center" justifyContent="center">
      <Stack width={1200} direction="row">
        <Stack width={450} spacing={2.5}>
          <Stack spacing={1.25}>
            <Typography variant="h2" fontSize={24}>
              {title}
            </Typography>
            <Typography variant="subtitle2" color="colors.darkGray3">
              {subTitle}
            </Typography>
          </Stack>
          {constraints.length != 0 && (
            <Stack spacing={0.625}>
              <Typography variant="h4" fontSize={14} color="colors.darkGray3">
                Constaints
              </Typography>
              <Box component="ul" sx={{ listStyleType: "disc", pl: 2.5, m: 0 }}>
                {constraints.map((item, index) => (
                  <Box component="li" key={index} sx={{ p: 0, m: 0 }}>
                    <Typography variant="caption">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          )}
          {solutions.length != 0 && (
            <Stack spacing={0.625}>
              <Typography variant="h4" fontSize={14} color="colors.darkGray3">
                Solution
              </Typography>
              <Box component="ul" sx={{ listStyleType: "disc", pl: 2.5, m: 0 }}>
                {solutions.map((item, index) => (
                  <Box component="li" key={index} sx={{ p: 0, m: 0 }}>
                    <Typography variant="caption">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          )}
          {keyThinkings.length != 0 && (
            <Stack spacing={0.625}>
              <Typography variant="h4" fontSize={14} color="colors.darkGray3">
                Key Thinking
              </Typography>
              <Box component="ul" sx={{ listStyleType: "disc", pl: 2.5, m: 0 }}>
                {keyThinkings.map((item, index) => (
                  <Box component="li" key={index} sx={{ p: 0, m: 0 }}>
                    <Typography variant="caption">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          )}
          <Stack spacing={0.625}>
            <Typography variant="h4" fontSize={14} color="colors.darkGray3">
              Outcome
            </Typography>
            <Typography variant="caption" lineHeight="17px">
              {outcome}
            </Typography>
          </Stack>
        </Stack>
        {renderImages()}
      </Stack>
    </Wrapper>
  );
};

export default WebDesignDetail;
