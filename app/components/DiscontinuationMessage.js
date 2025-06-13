"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { Fade, useTheme } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export const DiscontinuationMessage = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";

    return (
        <Fade in={true} timeout={1000}>
            <Box 
                className="display-flex justify-center padding-2rem"
                sx={{
                    minHeight: "calc(100vh - 200px)",
                    alignItems: "center"
                }}
            >
                <Paper 
                    elevation={3} 
                    sx={{ 
                        maxWidth: "800px",
                        width: "100%",
                        p: 4,
                        backgroundColor: isDarkMode 
                            ? theme.palette.background.paper 
                            : theme.palette.background.default,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2
                    }}
                >
                    <Box 
                        className="display-flex justify-center"
                        sx={{ mb: 3 }}
                    >
                        <WarningAmberIcon 
                            sx={{ 
                                fontSize: 48,
                                color: theme.palette.warning.main,
                                mr: 2
                            }} 
                        />
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            sx={{ 
                                fontWeight: 500,
                                color: theme.palette.text.primary
                            }}
                        >
                            HC Utils Has Been Moved
                        </Typography>
                    </Box>
                    
                    <Typography 
                        variant="body1" 
                        paragraph
                        sx={{ 
                            color: theme.palette.text.secondary,
                            fontSize: "1.1rem",
                            lineHeight: 1.6,
                            mb: 4,
                            textAlign: "center"
                        }}
                    >
                        This version of HC Utils has been discontinued. Please visit our new platform at:
                    </Typography>
                    
                    <Box 
                        className="display-flex justify-center"
                        sx={{ 
                            mb: 4,
                            p: 3,
                            backgroundColor: isDarkMode 
                                ? theme.palette.action.hover 
                                : theme.palette.grey[50],
                            borderRadius: 1
                        }}
                    >
                        <Link 
                            href="https://utils.heavyconnect.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                                fontSize: "1.25rem",
                                fontWeight: 500,
                                color: theme.palette.primary.main,
                                textDecoration: "none",
                                "&:hover": {
                                    textDecoration: "underline"
                                },
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            Utils.HeavyConnect.com
                        </Link>
                    </Box>
                    
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: theme.palette.text.secondary,
                            textAlign: "center",
                            fontStyle: "italic"
                        }}
                    >
                        Thank you for your understanding as we continue to improve our tools.
                    </Typography>
                </Paper>
            </Box>
        </Fade>
    );
};
