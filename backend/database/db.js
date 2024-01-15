//rakesh12345
//mongodb+srv://rakeshibm909:<password>@meardatabase.fzh6dii.mongodb.net/
import {connect} from 'mongoose'

const connectToMongo=async()=>{
 
    try {
        await connect('mongodb+srv://rakeshibm909:rakesh12345@meardatabase.fzh6dii.mongodb.net/');
        console.log("----Database connected Successfully")
        
    } catch (error) {
        
    }

}
export default connectToMongo