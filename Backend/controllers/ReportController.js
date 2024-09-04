const { Template1,Template2,Template3,Template4, Template5 ,Template6 } = require("../utils/Templates")
const pdf = require('html-pdf');
const Report=require('../models/ReportModel')
const User = require("../models/UserModel");
const { getTokenDetails } = require("../utils/getTokenDetails");
const { v4: uuidv4 } = require('uuid'); // Ensure uuid is required
const path = require('path');
const fs = require('fs');
const uploadsDir = path.join(__dirname, '../uploads');

exports.createReport = async (req, res) => {
  try {
      const token = req.cookies.token;

      if (!token) {
          return res.json({
              message: "User not Loged in",
              error: true
          });
      }
      const userdata = getTokenDetails(token);

      if (!req.body.title || !req.body.date || !req.body.time || !req.body.location) {
          return res.status(400).json({
              success: false,
              error: "All required fields (title, data,time, location) must be provided",
          });
      }

      const imageNames = [];
      if (req.files) {
        let files = req.files.pictures;

        if (!Array.isArray(files)) {
          files = [files];
        }
        files.forEach(file => {
          const uniqueName = uuidv4() + path.extname(file.name);
          const uploadPath = path.join(uploadsDir, uniqueName);


          file.mv(uploadPath, err => {
              if (err) {
                  return res.status(500).send(err);
              }
          });
          imageNames.push(uniqueName)
        });
      }

      const newReport = new Report({
          title: req.body.title,
          date:req.body.date,
          time: req.body.time,
          location: req.body.location,
          pictures: imageNames,
          template: req.body.template,
          creator: userdata.id,
      });
      await newReport.save();

      const user = await User.findById(userdata.id);
      const userReportCount = user.reports + 1;
      await User.findByIdAndUpdate(userdata.id, { reports: userReportCount });

      return res.json({
          success: true,
          message:"Report is created",
          data:newReport
      });
  } catch (error) {
      return res.json({
          success: false,
          error: error.message
      });
  }
};
exports.getReport=async(req,res)=>{
  try {
    const  reportId=req.params.id;
    const report=await Report.findById(reportId)
    if(!report){
      return res.json({
        success:false,
        message:"Report Not found"
      })
    }
    return res.json({
      success:true,
      data:report
    })
  } catch (error) {
    return res.json({
      success: false,
      error: error.message
    });
  }
}
exports.getUserReports=async(req,res)=>{
  try {
    const token = req.cookies.token;

      if (!token) {
          return res.json({
              message: "User not Loged in",
              error: true
          });
      }
      const userdata = getTokenDetails(token);
      const reports=await Report.find({creator:userdata.id}).sort({createdAt:-1})
      return res.json({
        success:true,
        data:reports
      })
  } catch (error) {
    return res.json({
      success:false,
      error:error.message
  })
  }
}

exports.updateReport=async(req,res)=>{
  try {
    const token = req.cookies.token;
      if (!token) {
          return res.json({
              message: "User not Loged in",
              error: true
          });
      }
    const userdata = getTokenDetails(token);
    const reportId=req.params.id;
    const oldReport=await Report.findById(reportId);
    if(userdata.id !== oldReport.creator.toString()){
      return res.json({
        success:false,
        message:"Report can not be updated"
    })
    }
    const { title, date,time, location } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (date) updateData.date = date;
    if (time) updateData.time = time;
    if (location) updateData.location = location;

    updatedReport=await Report.findByIdAndUpdate(reportId,updateData,{new:true})
    if(!updatedReport){
      return res.json({
        success:false,
        message:"Report can not be updated"
    })
    }
    return res.json({
      success:true,
      data:updatedReport
    })
  } catch (error) {
    return res.json({
      success:false,
      error:error.message
  })
  }
}

exports.deleteReport=async(req,res)=>{
  try {
    const token = req.cookies.token;
      if (!token) {
          return res.json({
              message: "User not Loged in",
              error: true
          });
      }
    const userdata = getTokenDetails(token);
    const reportId=req.params.id;
    const report=await Report.findById(reportId);
    if(userdata.id !== report.creator.toString()){
      return res.json({
        success:false,
        message:"Report can not be Deleted"
    })
    }
    report.pictures.forEach(image => {
      const filePath = path.join(uploadsDir, image);
      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
      }
    });
    await Report.findByIdAndDelete(reportId);

    const user = await User.findById(userdata.id);
    const userReportCount = user.reports - 1;
    await User.findByIdAndUpdate(userdata.id, { reports: userReportCount });

    return res.json({
      success: true,
      message: "Report deleted successfully"
  });
  } catch (error) {
    return res.json({
      success:false,
      error:error.message
  })
  }
}

exports.viewReport=async(req,res)=>{
  try {
    const token = req.cookies.token;
      if (!token) {
          return res.json({
              message: "User not Loged in",
              error: true
          });
      }
    const userdata = getTokenDetails(token);
    const reportId=req.params.id;
    const report=await Report.findById(reportId);
    if(!report ||userdata.id !== report.creator.toString()){
      return res.json({
        success:false,
        message:"Report is not available"
    })
    }
    let html;
    if(report.template===1){
      html=Template1(report.title,report.date,report.time,report.location)
    }else if (report.template===2) {
      html=Template2(report.title,report.date,report.time,report.location)
    }else if (report.template===3) {
      html=Template3(report.title,report.date,report.time,report.location,report.pictures)
    }else if (report.template===4) {
      html=Template4(report.title,report.date,report.time,report.location,report.pictures)
    }else if (report.template===5) {
      html=Template5(report.title,report.date,report.time,report.location,report.pictures)
    }else if (report.template===6) {
      html=Template6(report.title,report.date,report.time,report.location,report.pictures)
    }else{
      return res.json({
        success:false,
        message:"Template Not available"
    })
    }

    pdf.create(html).toStream((err, stream) => {
      if (err) return res.status(500).send(err);
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
  });

  } catch (error) {
    return res.json({
      success:false,
      error:error.message
  })
  }
}

exports.downloadReport=async(req,res)=>{
  try {
    const token = req.cookies.token;
      if (!token) {
          return res.json({
              message: "User not Loged in",
              error: true
          });
      }
    const userdata = getTokenDetails(token);
    const reportId=req.params.id;
    const report=await Report.findById(reportId);

    if(!report || userdata.id !== report.creator.toString()  ){
      return res.json({
        success:false,
        message:"Report is not available"
    })
    }
    let html;
    if(report.template===1){
      html=Template1(report.title,report.date,report.time,report.location)
    }else if (report.template===2) {
      html=Template2(report.title,report.date,report.time,report.location)
    }else if (report.template===3) {
      html=Template3(report.title,report.date,report.time,report.location,report.pictures)
    }else if (report.template===4) {
      html=Template4(report.title,report.date,report.time,report.location,report.pictures)
    }else if (report.template===5) {
      html=Template5(report.title,report.date,report.time,report.location,report.pictures)
    }else if (report.template===6) {
      html=Template6(report.title,report.date,report.time,report.location,report.pictures)
    }else{
      return res.json({
        success:false,
        message:"Template Not available"
    })
    }

    pdf.create(html).toStream((err, stream) => {
      if (err) return res.status(500).send(err);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${report.title}.pdf`);
      stream.pipe(res);
  });

  } catch (error) {
    return res.json({
      success:false,
      error:error.message
  })
  }
}
