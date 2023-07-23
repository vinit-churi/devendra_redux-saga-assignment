import { Card, CardContent, Typography } from "@mui/material";
// import ContributionChart from "./ContributionChart";
import CommitChart from "./CommitChart";
import CodeFrequencyChart from "./CodeFrequencyChart";
const GitUserCard = ({ repoInfo }) => {
    console.log(repoInfo);
    const {
        full_name,
        description,
        stargazers_count,
        forks_count,
        open_issues_count,
        owner: { avatar_url, login },
        git_url,
        name,
        forks,
    } = repoInfo;
    const [owner, repoName] = full_name.split("/");
    console.log(owner, repoName, full_name);
    return (
        <Card>
            <CardContent>
                <img src={avatar_url} alt="avatar" />
                <Typography variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {login}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {forks}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {stargazers_count}
                </Typography>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CommitChart owner={owner} repoName={repoName} />
            <CodeFrequencyChart owner={owner} repoName={repoName} />
        </Card>
    );
};

export default GitUserCard;
