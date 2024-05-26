import { signIn } from "next-auth/react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LockPersonIcon from "@mui/icons-material/LockPerson";

const SignInCard = () => {
    const callbackUrl = process.env.NEXTAUTH_URL;

    return (
        <Card
            onClick={() => signIn("google", { callbackUrl })}
            className="signin-card text-center">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250"
                    image="/lock.jpg"
                    alt="not signed in"
                />

                <CardContent>
                    <Typography variant="h6">
                        You need to sign in first.
                    </Typography>
                    <LockPersonIcon sx={{ fontSize: 36 }} />
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default SignInCard;
