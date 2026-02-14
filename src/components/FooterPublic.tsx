import { Box, IconButton, Typography, Container, Grid, Divider, Stack } from "@mui/material";
import logo from "@/assets/react.svg";
import dots from "@/assets/dotsPattern.svg";
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const FooterPublic = () => {
   const currentYear = new Date().getFullYear();

   const footerLinks = {
      platform: [
         { label: "Browse Courses", href: "/admin/dashboard" },
         { label: "Categories", href: "#" },
         { label: "Instructors", href: "#" },
         { label: "Learning Flow", href: "#" },
      ],
      company: [
         { label: "About Us", href: "#" },
         { label: "Careers", href: "#" },
         { label: "Blog", href: "#" },
         { label: "Contact Us", href: "#" },
      ],
      support: [
         { label: "Help Center", href: "#" },
         { label: "Privacy Policy", href: "#" },
         { label: "Terms of Service", href: "#" },
         { label: "FAQ", href: "#" },
      ],
   };

   return (
      <Box 
         component="footer" 
         sx={{ 
            bgcolor: "primary.main", 
            color: "primary.contrastText",
            position: "relative",
            overflow: "hidden",
            pt: 8,
            pb: 4
         }}
      >
         {/* Background Decoration */}
         <Box 
            component="img"
            src={dots}
            alt=""
            sx={{ 
               position: "absolute", 
               bottom: 0, 
               right: 0, 
               width: "400px", 
               opacity: 0.5,
               pointerEvents: "none",
               transform: "rotate(180deg)"
            }}
         />

         <Container maxWidth="xl">
            <Grid container spacing={6}>
               {/* Brand & Info */}
               <Grid size={{xs: 12, md: 4}}>
                  <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
                     <Box 
                        sx={{ 
                           p: 1, 
                           bgcolor: "rgba(255,255,255,0.1)", 
                           borderRadius: 2,
                           display: "flex"
                        }}
                     >
                        <img src={logo} alt="Logo" style={{ height: 32 }} />
                     </Box>
                     <Typography variant="h5" color="primary.contrastText" fontWeight={800} letterSpacing={-0.5}>
                        Learning Support
                     </Typography>
                  </Box>
                  <Typography color="primary.contrastText" variant="body2" sx={{ opacity: 0.8, lineHeight: 1.8, mb: 4, maxWidth: "320px" }}>
                     Berkomitmen untuk mendemokratisasi pendidikan teknologi berkualitas tinggi agar siapa pun dapat meraih karir impian mereka di era digital.
                  </Typography>
                  
                  <Stack spacing={2}>
                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <MdEmail size={20} />
                        <Typography color="primary.contrastText" variant="body2" sx={{ opacity: 0.8 }}>support@learningsupport.com</Typography>
                     </Box>
                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <MdPhone size={20} />
                        <Typography color="primary.contrastText" variant="body2" sx={{ opacity: 0.8 }}>+62 21 1234 5678</Typography>
                     </Box>
                     <Box sx={{ display: "flex", alignItems: "start", gap: 1.5 }}>
                        <MdLocationOn size={20} className="mt-1" />
                        <Typography color="primary.contrastText" variant="body2" sx={{ opacity: 0.8 }}>
                           Jakarta Selatan, DKI Jakarta<br />Indonesia
                        </Typography>
                     </Box>
                  </Stack>
               </Grid>

               {/* Quick Links */}
               <Grid size={{xs: 12, md: 8}}>
                  <Grid container spacing={4}>
                     <Grid size={{xs: 6, sm: 4}}>
                        <Typography color="primary.contrastText" variant="subtitle1" fontWeight={700} sx={{ mb: 3 }}>Platform</Typography>
                        <Stack spacing={1.5}>
                           {footerLinks.platform.map((link) => (
                              <Typography color="primary.contrastText" 
                                 key={link.label} 
                                 variant="body2" 
                                 sx={{ 
                                    opacity: 0.7, 
                                    cursor: "pointer",
                                    "&:hover": { opacity: 1, textDecoration: "underline" }
                                 }}
                              >
                                 {link.label}
                              </Typography>
                           ))}
                        </Stack>
                     </Grid>
                     <Grid size={{xs: 6, sm: 4}}>
                        <Typography color="primary.contrastText" variant="subtitle1" fontWeight={700} sx={{ mb: 3 }}>Company</Typography>
                        <Stack spacing={1.5}>
                           {footerLinks.company.map((link) => (
                              <Typography color="primary.contrastText" 
                                 key={link.label} 
                                 variant="body2" 
                                 sx={{ 
                                    opacity: 0.7, 
                                    cursor: "pointer",
                                    "&:hover": { opacity: 1, textDecoration: "underline" }
                                 }}
                              >
                                 {link.label}
                              </Typography>
                           ))}
                        </Stack>
                     </Grid>
                     <Grid size={{xs: 6, sm: 4}}>
                        <Typography color="primary.contrastText" variant="subtitle1" fontWeight={700} sx={{ mb: 3 }}>Support</Typography>
                        <Stack spacing={1.5}>
                           {footerLinks.support.map((link) => (
                              <Typography color="primary.contrastText" 
                                 key={link.label} 
                                 variant="body2" 
                                 sx={{ 
                                    opacity: 0.7, 
                                    cursor: "pointer",
                                    "&:hover": { opacity: 1, textDecoration: "underline" }
                                 }}
                              >
                                 {link.label}
                              </Typography>
                           ))}
                        </Stack>
                     </Grid>
                  </Grid>

                  {/* Social Media */}
                  <Box sx={{ mt: 6 }}>
                     <Typography color="primary.contrastText" variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>Follow Us</Typography>
                     <Stack direction="row" spacing={1.5}>
                        {[
                           { icon: <FaInstagram size={18} />, label: "Instagram" },
                           { icon: <FaXTwitter size={18} />, label: "Twitter" },
                           { icon: <FaYoutube size={18} />, label: "Youtube" },
                           { icon: <FaLinkedinIn size={18} />, label: "Linkedin" },
                        ].map((social) => (
                           <IconButton 
                              key={social.label}
                              sx={{ 
                                 bgcolor: "rgba(255,255,255,0.1)", 
                                 color: "inherit",
                                 "&:hover": { bgcolor: "white", color: "primary.main" }
                              }}
                           >
                              {social.icon}
                           </IconButton>
                        ))}
                     </Stack>
                  </Box>
               </Grid>
            </Grid>


         </Container>

         <Box className="px-20 max-sm:px-5">
            <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.1)" }} />

            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
               <Typography color="primary.contrastText" variant="caption" sx={{ opacity: 0.6 }}>
                  © {currentYear} Learning Support. All Rights Reserved.
               </Typography>
               <Stack direction="row" spacing={3}>
                  <Typography color="primary.contrastText" variant="caption" sx={{ opacity: 0.6, cursor: "pointer", "&:hover": { opacity: 1 } }}>
                     Privacy Policy
                  </Typography>
                  <Typography color="primary.contrastText" variant="caption" sx={{ opacity: 0.6, cursor: "pointer", "&:hover": { opacity: 1 } }}>
                     Terms of Service
                  </Typography>
                  <Typography color="primary.contrastText" variant="caption" sx={{ opacity: 0.6, cursor: "pointer", "&:hover": { opacity: 1 } }}>
                     Cookies
                  </Typography>
               </Stack>
            </Box>
         </Box>
      </Box>
   );
};

export default FooterPublic;
