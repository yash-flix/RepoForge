
const createIssue = (req,res)=>
{
    res.send("issue created")
};
const updateIssueById = (req,res)=>
{
    res.send("issue updated")
};
const deleteIssueById = (req,res)=>
{
    res.send("issue deleted")
};
const getAllIssues = (req,res)=>
{
    res.send(" All issues fetched")
};

const getIssueById = (req,res)=>
{
    res.send("Issue fetched")
}
export default 
{
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById
}