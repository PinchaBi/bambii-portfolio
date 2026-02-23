import { useNavigate } from "react-router-dom";

import { ITEM_AMOUNT } from "@/constants/web-design";
import { Box, Stack, Typography } from "@mui/material";

import { webDesignList } from "../../constants";

const WebDesignList = () => {
  // --------------------------- Hooks ---------------------------
  //region Hooks
  const navigate = useNavigate();

  const enterItem = (id: number) => {
    navigate(`/web-design/${id}`);
  };

  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack height="100%" direction="row" alignItems="flex-end" width="max-content">
      {Array.from({ length: ITEM_AMOUNT }).map((_, index) => {
        const { name, socialTitle } = webDesignList[index + 1];

        return (
          <Stack
            key={index}
            spacing={1.25}
            onClick={() => enterItem(index + 1)}
            padding={2}
            alignItems="center"
            sx={{
              cursor: "pointer",
            }}
          >
            <Stack spacing={1.25} alignItems="center">
              <Typography variant="h2" fontSize={24}>
                {name}
              </Typography>
              <Typography variant="caption">{socialTitle}</Typography>
            </Stack>
            <Box width={500} height={200} bgcolor="black" />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default WebDesignList;
