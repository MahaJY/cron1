const User = require('../models/usermodel');
const UserAuth = require('../models/empmodel'); 
const ExcelJS = require('exceljs');
const bcrypt = require('bcrypt');
const getUsers = async (req,res) => {
  try {
    const users = await User.findAll();
    console.log('Fetched users:', users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
const upload = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile('C:\\Users\\Asus\\Desktop\\nodejs_pratice\\Book2.xlsx');
      const worksheet = workbook.getWorksheet(1);
  
      await worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
        if (rowNumber > 1) {
          const data = row.values;
          console.log('Row values:', data);
          if (data[1] && data[2] && data[3] && data[4] && data[5] && data[6]) {
            const hashedPassword = bcrypt.hashSync(data[6], 10);
            await UserAuth.create({
              id: data[1],
              name: data[2],
              jobtitle: data[3],
              department: data[4],
              username: data[5],
              password: hashedPassword,
              role: data[7],
            });
          } else {
            console.error('Incomplete data in Excel row:', data);
          }
        }
      });
  
      
    } catch (error) {
      console.error('Error importing data:', error.message);
      
    }
  };
  const exceltosql = async()=>{
    try {
      const emp = await UserAuth.findAll();
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('sheet 1');
      const headers = Object.keys(UserAuth.rawAttributes);
      worksheet.addRow(headers);
      emp.forEach(employee => {
          const rowData = Object.values(employee.dataValues);
          console.log(rowData);
          worksheet.addRow(rowData);
        });
      const filePath='C:/Users/Asus/Desktop/nodejs_pratice/empexcel2.xlsx'
      await workbook.xlsx.writeFile(filePath);
     console.log('Data exported to Excel file:', filePath);
      } catch (error) {
      console.error('Error exporting data to Excel:', error);
     
    }
  }


module.exports = { getUsers,upload,exceltosql };