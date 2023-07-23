import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import "./App.css";
import { getMostStarredRepos } from "./api";
import GitUserCard from "./GitUserCard";
function App() {
    const [data, setData] = useState(null);
    useEffect(() => {
        (async () => {
            let response = await getMostStarredRepos();
            console.log(response);
            setData(response);
        })();
    }, []);
    return (
        <div className="app">
            <Box variant="outlined">
                <Typography
                    variant="h2"
                    sx={{ backgroundColor: "primary.dark" }}
                >
                    git application
                </Typography>
            </Box>
            <Box variant="outlined">
                <Typography variant="subheading">
                    {data &&
                        data.map((repo) => (
                            <GitUserCard key={repo.id} repoInfo={repo} />
                        ))}
                </Typography>
            </Box>
        </div>
    );
}

export default App;
