
const createRepository = (req,res)=>
{
    res.send("repo created")
};

const getAllRepositories = (req,res)=>
{
    res.send("repos fetched")
};
const fetchRepositoryById = (req,res)=>
{
    res.send("repo found")
};
const fetchRepositoryByName = (req,res)=>
{
    res.send("repo Name found")
};
const fetchRepositoriesForCurrentUser = (req,res)=>
{
    res.send("repo for loggin in user fetched")
};
const updateRepositoryById = (req,res)=>
{
    res.send("repo updated")
};
const toggleVisibilityById = (req,res)=>
{
    res.send("Visibility toggled")
};
const deleteRepositoryById = (req,res)=>
{
    res.send("repo deleted")
};
export default
{
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoriesForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById

}