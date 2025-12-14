import mongoose from "mongoose"
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";
 

const createRepository = async(req,res)=>
{
    const {owner , name , issues , content , description , visibility} = req.body
    try {
        if(!name){return res.status(400).json({error:"Repository name required"})};
        if(!mongoose.Types.ObjectId.isValid(owner)){return res.status(400).json({error:"Invalid userId"})};
        
        const newRepositroy = new Repository(
            {
                name , description , visibility , owner , content , issues
            }
        );
        const result = newRepositroy.save();
        res.status(201).json({message : "Repository Created" , repositoryID : result._id});
  
    } catch (error) {
        console.log("error creating repository" , error.message);
        res.status(500).send("Server error");  
        
    }
};

const getAllRepositories = async(req,res)=>
{
    try {
        const repositories = await Repository.find({})
        .populate("owner")
        .populate("issues")

        res.json(repositories);

        
    } catch (error) {
        console.log("error fetching repositories" , error.message);
        res.status(500).send("Server error");      
    }
};
const fetchRepositoryById = async(req,res)=>
{
    const {id} = req.params;
    try {
        const repository = await Repository.find({_id: id})
        .populate("owner")
        .populate("issues")
        
        
        res.json(repository);
        
    } catch (error) {
        console.log("error fetching repository" , error.message);
        res.status(500).send("Server error");  
    }
    
};
const fetchRepositoryByName = async(req,res)=>
{
    const {name} = req.params;
    try {
        const repository = await Repository.find({name})
        .populate("owner")
        .populate("issues")
        
        res.json(repository);
        
    } catch (error) {
        console.log("error fetching repository" , error.message);
        res.status(500).send("Server error");  
    }
};
const fetchRepositoriesForCurrentUser = async(req,res)=>
{
   const userId = req.user;
   try {
    const respositories = await Repository.find({owner:userId});
    if(!respositories || respositories.length == 0 )
    {
        return res.status(404).json({error: "User Repositories not found"});
    }
    res.json({message:"Repositories found", respositories});
    
   } catch (error) {
        console.log("error fetching user repository" , error.message);
        res.status(500).send("Server error");
    
   }
};
const updateRepositoryById = async(req,res)=>
{
    const {id } = req.params;
    const {content , description} = req.body;

    try {
        const repository = await Repository.findById(id);
        if(!repository){
            return res.status(404).json({error: "Repository not found"});
        }
        repository.content.push(content);
        repository.description = description;

        const updatedRepository = await repository.save();
        res.json({message:"Repository updated successfully" , updatedRepository})
    } catch (error) {
        console.log("error during updating repository" , error.message);
        res.status(500).send("Server error");
    }
};
const toggleVisibilityById = async(req,res)=>
{
    const {id } = req.params;
    
    try {
        const repository = await Repository.findById(id);
        if(!repository){
            return res.status(404).json({error: "Repository not found"});
        }
        repository.visibility = !repository.visibility;

        const updatedRepository = await repository.save();
        res.json({message:"Repository visibilty toggled successfully" , updatedRepository})
    } catch (error) {
        console.log("error during toggeling repository" , error.message);
        res.status(500).send("Server error");
    }
};
const deleteRepositoryById = async(req,res)=>
{
    const {id} = req.params;
    try {
        const repository = await Repository.findByIdAndDelete(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    res.json({ message: "Repository deleted successfully!" });
        
    } catch (error) {
        console.log("error deleting repository" , error.message);
        res.status(500).send("Server error");
    }
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