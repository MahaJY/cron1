const {  getUsers,upload,exceltosql} = require('../utils/userutils');
const cron = require('node-cron')

const getAllUsers = (req,res) => {
  const cronjob3 = cron.schedule('34 14 8 * *', async () => {
    console.log('Running getUsers task at:', new Date());
    try {
       await getUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
    }finally {
      //cronjob3.stop();
      res.json("Data fetched successfully");
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata" ,
  });
};
const uploadJob = (req,res)=>{
    const cronjob2 =cron.schedule(' 10 15 8 2 *', async () => {
        console.log('Running importing data from excel task at:', new Date());
    try {
      await upload();
      
    } catch (error) {
      console.error('Error executing upload function:', error.message);
    }finally{
      res.json("File imported successfully");
      cronjob2.stop();
    }
  
}, {
    scheduled: true,
    timezone: "Asia/Kolkata",
  });
};
  const exportExcel = (req,res)=>{
    const cronjob1 = cron.schedule(' 44 16 * * * ',async () => {
        console.log('Running exporting data from sql  task at:', new Date());
        try{
            await exceltosql();
            
          } catch (error) {
            console.error('Error executing exceltosql function:', error.message);
          }finally{
            res.json("File exported successfully");
          }
        
      }, {
          scheduled: true,
          timezone: "Asia/Kolkata",
        });
      };




module.exports = { getAllUsers,uploadJob,exportExcel };