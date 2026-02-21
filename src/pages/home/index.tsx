import { Box, Stack } from "@mui/material";

import AboutView from "@/features/about/components/AboutView";
import ActivityView from "@/features/activity/components/ActivityView";
import ContactView from "@/features/contact/components/ContactView";
import ProjectView from "@/features/project/components/ProjectView";

export default function HomePage() {
  // --------------------------- Renders ---------------------------
  //region Renders

  return (
    <Stack>
      <Box id="about-view" sx={{ position: "relative", top: 0, zIndex: 1 }}>
        <AboutView />
      </Box>
      <Box id="project-view" sx={{ position: "relative", top: 0, zIndex: 2 }}>
        <ProjectView />
      </Box>
      <Box id="activity-view" sx={{ position: "sticky", top: 0, zIndex: 3 }}>
        <ActivityView />
      </Box>
      <Box id="contact-view" sx={{ position: "sticky", top: 0, zIndex: 4 }}>
        <ContactView />
      </Box>
    </Stack>
  );
}
