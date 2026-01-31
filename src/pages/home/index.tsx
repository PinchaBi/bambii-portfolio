import { Box, Stack } from "@mui/material";
import ProjectView from "@/features/project/components/ProjectView";
import ContactView from "@/features/contact/components/ContactView";
import ActivityView from "@/features/activity/components/ActivityView";

export default function HomePage() {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack>
      <Box id="project-view">
        <ProjectView />
      </Box>
      <ActivityView />
      <Box id="contact-view">
        <ContactView />
      </Box>
    </Stack>
  );
}
