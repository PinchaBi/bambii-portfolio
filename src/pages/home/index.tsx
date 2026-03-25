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
      {/* About: sticky at top — stays visible while spacer scrolls below */}
      <Box
        id="about-view"
        sx={{
          top: 0,
          zIndex: 1,
          height: "100vh",
          position: "sticky",
          overflow: "hidden",
        }}
      >
        <AboutView />
      </Box>
      {/* Scroll budget for about animations (200vh = full interactivity range) */}
      <Box sx={{ height: "200vh" }} />
      {/* Project: slides up and overlays about */}
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
