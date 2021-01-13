import React, { useEffect, useState } from "react";
import FunInfo from "../add_outline_componenets/FunInfo.js";
import axios from 'axios'
import FunOutcome from "../add_outline_componenets/FunOutcome.js";
import FunCalculator from "../add_outline_componenets/FunCalculator.js"
import SearchPolicies from "../search_componenets/SearchPolicies"
import PublishIcon from '@material-ui/icons/Publish';
import Container from "@material-ui/core/Container";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import TimeTable from "../add_outline_componenets/FunTimeTable"
import Instructor from "../add_outline_componenets/FunInstructor"
import Exam from "../add_outline_componenets/FunExam"
import GradeDetermination from"../add_outline_componenets/FunGradeDetermination"
import GradeNotes from "../add_outline_componenets/FunGradeNotes"
import GradeDistribution from "../add_outline_componenets/FunGradeDistribution"
import TextBook from"../add_outline_componenets/FunTextbook"
import ContentCategory from"../add_outline_componenets/FunContentCategory"
import Section from "../add_outline_componenets/FunSection"
import Lab from "../add_outline_componenets/FunLab"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

const AddCourse = () => {
  const classes = useStyles();

  

const[db,setDB]=useState()
 
  //JSON tables and use states
 
  const[notes,setNotes]=useState({CourseID:"",GradeNotes:"",Examination:"",CourseDescription:"",UseCalc:""})
  const [save,setSave]=useState(false)
  const [info,setInfo]=useState({CourseID:""})//Blank CourseID used for checking
   const[contentCategory,setContentCategory]=useState("")
  const[section,setSection]=useState("")
  const[lab,setLab]=useState({})
  const[AuWeight,setAuWeight]=useState("")
  const [outcome,setOutcome]=useState([])
  const[timeTable,setTimeTable]=useState("")
  const [coordinator,setcoordinator]=useState({})
  const[instructor,setInstructor]=useState([])
  const[ta,setTa]=useState([])
 
  const[gradeDetermination,setGradeDetermination]=useState("")
  const[gradeDistribution,setGradeDistribution]=useState("")
  const[textbook,setTextbook]=useState("")
//fetches data from db
useEffect(()=>{

  axios.get("http://34.220.149.181:8000/course/")
  .then(res => setDB(res.data))
  .catch((error) => {console.log(error)})
  
  setSave(false)
  
 },[save]);
  const createJSON=()=>{
    
    if(info.CourseID!==""){
      //creat notes
   
      
     
      notes.CourseID=info.CourseID
      //creating outcome
      for(let i=0;i<outcome.length;i++){
        outcome[i].CourseID=info.CourseID
      }
      //creating content category
      for(let i=0;i<contentCategory.length;i++){
        contentCategory[i].CourseID=info.CourseID
      }
      //creating au
      for(let i=0;i<AuWeight.length;i++){
        AuWeight[i].CourseID=info.CourseID
      }
      //creating section
      for(let i=0;i<section.length;i++){
        section[i].CourseID=info.CourseID
      }
       //creating lab
       lab.CourseID=info.CourseID
      //creating TimeTable
      for(let i=0;i<timeTable.length;i++){
       
        timeTable[i].CourseID=info.CourseID
      }
      //creating Coordinator
      coordinator.CourseID=info.CourseID
      //creating instructor
      for(let i=0;i<instructor.length;i++){
       
        instructor[i].CourseID=info.CourseID
      }
      //creating ta
      for(let i=0;i<ta.length;i++){
       
        ta[i].CourseID=info.CourseID
      }
      //creating Grade Determination
      for(let i=0;i<gradeDetermination.length;i++){
       
        gradeDetermination[i].CourseID=info.CourseID
      }
      //creating Grade Distribution
      for(let i=0;i<gradeDistribution.length;i++){
       
        gradeDistribution[i].CourseID=info.CourseID
      }
       //creating textbook
       for(let i=0;i<textbook.length;i++){
       
        textbook[i].CourseID=info.CourseID
      }
    } 
  }
   
  
const upload=()=>{

  let check=true
  if(info.CourseID!=="")
{
 
  for(let i=0;i<db.length;i++){
        
    if(db[i].CourseID==info.CourseID)
    {
      
      check=false
      
    }
  }
  if(check){
  
  //posting COURSE
  axios.post("http://34.220.149.181:8000/course/",   {
    
    "CourseID": info.CourseID,
    "CourseHours": info.CourseHours,
    "CourseName": info.CourseName,
    "CalenderRefrence": info.CalenderRefrence,
    "AcademicCredit": info.AcademicCredit,
    "DateCreated": info.DateCreated
}).then(res=>{console.log(res)})
//posting Outcome

if(outcome.length>0)
outcome.map(row=>{
  axios.post("http://34.220.149.181:8000/outcome/",{
    "CourseID":info.CourseID,
    "OutcomeNum":row.OutcomeNum,
    "Description":row.Description,
    "GraduateAttribute":row.GraduateAttribute,
    "InstructionLvl":row.InstructionLvl
  }).then(res=>{console.log(res)})
})
//posting section
if(section.length>0)
section.map(row=>{
  axios.post("http://34.220.149.181:8000/section/",{
    
      "CourseID":info.CourseID,
      "SectionNumber":row.SectionNum,
      "Students":row.Student,
      "Hours":row.Hours,
      "type":row.type
        
      
      
  }).then(res=>{console.log(res)})
})
//posting content cartegory
if(contentCategory.length>0)
contentCategory.map(row=>{
  axios.post("http://34.220.149.181:8000/contentcategory/",{
    
    "CourseID":info.CourseID,
    "CategoryType":row.CategoryType,
    "Element":row.Element
        
      
      
  }).then(res=>{console.log(res)})
})


  console.log("Notes")
  console.log(notes)
  

  console.log("Content Category")
  console.log(contentCategory)
  console.log("Au weight")
  console.log(AuWeight)
  console.log("Section")
  console.log(section)

  console.log("Lab")
  console.log(lab)

  console.log("TimeTable")
  console.log(timeTable)
  console.log("coordinator tabke: ")
console.log(coordinator)
  console.log("Instructor table: ")
  console.log(instructor)

console.log("ta table ")
console.log(ta)

console.log("Grade Determination")
console.log(gradeDetermination)
console.log("Grade Distribution")
console.log(gradeDistribution)
console.log("Textbook")
console.log(textbook)

}
else
    alert("Course already exists")}
    else alert("Fill in calender info")
    
}


  return (
    <React.Fragment>
      <AppBar position="sticky" color="default">
        <Container maxWidth="md">
          <div className="pt-2 pb-2" align="right">
            <Button variant="outlined" color="secondary" onClick={()=>{
              setSave(true)
              //createJSON()
              upload()
              
             
                          
               }}>
                 upload
              <PublishIcon />
            </Button>
          </div>
        </Container>
      </AppBar>

      <br />

      <Container maxWidth="md">
        <Accordion defaultExpanded={true} elevation={5}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <label className="label is-size-3 has-text-left">
                1. Calendar Information
              </label>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <Paper className={classes.paper} elevation={3}>
                <FunInfo  setInfo={setInfo} notes={notes} />
                
              </Paper>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded={true} elevation={5}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <label className="label is-size-3 has-text-left">
                2. Learning Outcomes
              </label>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <Paper className={classes.paper} elevation={3}>
               
                <FunOutcome  setOutcome={setOutcome}  />
                <ContentCategory setContent={setContentCategory} setAu={setAuWeight}/>
                <Section setSection={setSection}/>
                <Lab setLab={setLab}/>
                
              </Paper>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded={true} elevation={5}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <label className="label is-size-3 has-text-left">
                3. Timetable
              </label>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <TimeTable setTimeTable={setTimeTable} />
              <Paper className={classes.paper} elevation={3}></Paper>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded={true} elevation={5}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <label className="label is-size-3 has-text-left">
                4. Course Instructors
              </label>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <Instructor  setCoordinator={setcoordinator} setInstructor={setInstructor} setTa={setTa} />
              <Paper className={classes.paper} elevation={3}></Paper>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded={true} elevation={5}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <label className="label is-size-3 has-text-left">
                5. Examinations
              </label>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <Exam notes={notes}/>
              <Paper className={classes.paper} elevation={3}>
                
              </Paper>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded={true} elevation={5}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <label className="label is-size-3 has-text-left">
                6. Use of Calculators in Examinations
              </label>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              
              <Paper className={classes.paper} elevation={3}>
                <FunCalculator notes={notes}/>
                           </Paper>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded={true} elevation={5}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <label className="label is-size-3 has-text-left">
                7. Final Grade Determination
              </label>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <Paper className={classes.paper} elevation={3}>
                <GradeDetermination setGradeDetermination={setGradeDetermination}/>
                <br/>
                
                <GradeNotes notes={notes}/>
                <br/>
                <GradeDistribution setGradeDistribution={setGradeDistribution}/>
              </Paper>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded={true} elevation={5}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <label className="label is-size-3 has-text-left">
                8. Textbook
              </label>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <Paper className={classes.paper} elevation={3}>

                <TextBook setTextbook={setTextbook}/>
              </Paper>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded={true} elevation={5}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <label className="label is-size-3 has-text-left">
                9. Course Policies
              </label>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <Paper className={classes.paper} elevation={3}>
                <SearchPolicies />
              </Paper>
            </div>
          </AccordionDetails>
        </Accordion>
      </Container>
      
    </React.Fragment>
  );
};
export default AddCourse;
