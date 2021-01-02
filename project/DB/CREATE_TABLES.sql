DROP schema if exists COURSE_OUTLINE;
CREATE schema COURSE_OUTLINE;
 use COURSE_OUTLINE;
 DROP TABLE if Exists COURSE;
CREATE TABLE COURSE (
  `CourseNum` VARCHAR(10) NOT NULL,
  `CourseHours` INT NULL,
  `CourseName` VARCHAR(45) NULL,
  `CalenderRefrence` VARCHAR(45) NULL,
  `AcademicCredit` INT NULL,
  `DateCreated` DATETIME NULL,
  PRIMARY KEY (`CourseNum`));
 DROP TABLE if Exists INFO;
CREATE TABLE `COURSE_OUTLINE`.`INFO` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `GradeNotes` MEDIUMTEXT NULL,
  `Examination` MEDIUMTEXT NULL,
  `CourseDescription` MEDIUMTEXT NULL,
  `UseCalc` TINYINT NULL,
  PRIMARY KEY (`CourseNum`),
  CONSTRAINT `CourseNum`
    FOREIGN KEY (`CourseNum`)
    REFERENCES `COURSE_OUTLINE`.`COURSE` (`CourseNum`)
    ON UPDATE CASCADE);
 DROP TABLE if Exists TEXTBOOK;
CREATE TABLE `COURSE_OUTLINE`.`TEXTBOOK` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `TITLE` VARCHAR(45) NOT NULL,
  `Publisher` VARCHAR(45) NULL,
  `Author` VARCHAR(45) NULL,
  `Edition` VARCHAR(45) NULL,
  PRIMARY KEY (`CourseNum`, `TITLE`),
  CONSTRAINT `TEXTBOOK_CourseNum`
    FOREIGN KEY (`CourseNum`)
    REFERENCES `COURSE_OUTLINE`.`COURSE` (`CourseNum`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);
    
 DROP TABLE if Exists COORDINATOR;
    CREATE TABLE `COURSE_OUTLINE`.`COORDINATOR` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `FName` VARCHAR(45) NULL,
  `LName` VARCHAR(45) NULL,
  `Phone` VARCHAR(10) NULL,
  `Office` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  PRIMARY KEY (`CourseNum`),
  CONSTRAINT `COORDINATOR_CourseNum`
    FOREIGN KEY (`CourseNum`)
    REFERENCES `COURSE_OUTLINE`.`COURSE` (`CourseNum`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);
  
   DROP TABLE if Exists GRADE_DISTRIBUTION;
    CREATE TABLE `COURSE_OUTLINE`.`GRADE_DISTRIBUTION` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `LowerLimit` INT NULL,
  `UpperLimit` INT NULL,
  `LetterGrade` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`CourseNum`, `LetterGrade`),
  CONSTRAINT `GRADE_DISTRIBUTION_CourseNum`
    FOREIGN KEY (`CourseNum`)
    REFERENCES `COURSE_OUTLINE`.`COURSE` (`CourseNum`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);
    
     DROP TABLE if Exists GRADE_DETERMINATION;
    CREATE TABLE `COURSE_OUTLINE`.`GRADE_DETERMINATION` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `Component` VARCHAR(45) NOT NULL,
  `OutcomeEvaluated` VARCHAR(45) NULL,
  `Weight` INT NULL,
  PRIMARY KEY (`CourseNum`, `Component`),
  CONSTRAINT `GRADE_DETERMINATION_CourseNum`
    FOREIGN KEY (`CourseNum`)
    REFERENCES `COURSE_OUTLINE`.`COURSE` (`CourseNum`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);
DROP TABLE if Exists OUTCOME;
CREATE TABLE `COURSE_OUTLINE`.`OUTCOME` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `OutcomeNum` INT NOT NULL,
  `Description` MEDIUMTEXT NULL,
  `GraduateAttribute` VARCHAR(45) NULL,
  `InstructionLvl` VARCHAR(45) NULL,
  PRIMARY KEY (`CourseNum`, `OutcomeNum`),
  CONSTRAINT `OUTCOME_CourseNum`
    FOREIGN KEY (`CourseNum`)
    REFERENCES `COURSE_OUTLINE`.`COURSE` (`CourseNum`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);

DROP TABLE if Exists CONTENT_CATEGORY;

CREATE TABLE `COURSE_OUTLINE`.`CONTENT_CATEGORY` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `CategoryType` VARCHAR(45) NOT NULL,
  `Element` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`CourseNum`, `CategoryType`,`Element` ),
  CONSTRAINT `CONTENT_CATEGORY_CourseNum`
    FOREIGN KEY (`CourseNum`)
    REFERENCES `COURSE_OUTLINE`.`COURSE` (`CourseNum`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);
    
DROP TABLE if Exists AU_WEIGHT;
    CREATE TABLE `COURSE_OUTLINE`.`AU_WEIGHT` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `Category` VARCHAR(45) NOT NULL,
  `AU%` INT NULL,
  PRIMARY KEY (`CourseNum`, `Category`),
  CONSTRAINT `AU_WEIGHT_CourseNum`
    FOREIGN KEY (`CourseNum` , `Category`)
    REFERENCES `COURSE_OUTLINE`.`CONTENT_CATEGORY` (`CourseNum` , `CategoryType`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);
    
DROP TABLE if Exists SECTION;
CREATE TABLE `COURSE_OUTLINE`.`SECTION` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `SectionNumber` VARCHAR(4) NOT NULL,
  `Students` INT NULL,
  `Hours` INT NULL,
  PRIMARY KEY (`CourseNum`, `SectionNumber`),
  CONSTRAINT `Section_CourseNum`
    FOREIGN KEY (`CourseNum`)
    REFERENCES `COURSE_OUTLINE`.`COURSE` (`CourseNum`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);
    
DROP TABLE if Exists LECTURE;
CREATE TABLE `COURSE_OUTLINE`.`LECTURE` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `LectureNum` VARCHAR(4) NOT NULL,
  `FName` VARCHAR(45) NULL,
  `LName` VARCHAR(45) NULL,
  `Phone` VARCHAR(45) NULL,
  `Office` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  PRIMARY KEY (`CourseNum`, `LectureNum`),
  CONSTRAINT `Lecture`
    FOREIGN KEY (`CourseNum` , `LectureNum`)
    REFERENCES `COURSE_OUTLINE`.`SECTION` (`CourseNum` , `SectionNumber`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);
    
    DROP TABLE if Exists LAB;
    CREATE TABLE `COURSE_OUTLINE`.`LAB` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `LabNum` VARCHAR(4) NOT NULL,
  `NumberOfLabs` INT NULL,
  `LabType` VARCHAR(45) NULL,
  `SafetyExamined` VARCHAR(45) NULL,
  `SafetyTaught` VARCHAR(45) NULL,
  `FName` VARCHAR(45) NULL,
  `LName` VARCHAR(45) NULL,
  `Phone` VARCHAR(45) NULL,
  `Office` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  PRIMARY KEY (`CourseNum`, `LabNum`),
  CONSTRAINT `LAB`
    FOREIGN KEY (`CourseNum` , `LabNum`)
    REFERENCES `COURSE_OUTLINE`.`SECTION` (`CourseNum` , `SectionNumber`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);
    
       DROP TABLE if Exists TUTORIAL;
    CREATE TABLE `COURSE_OUTLINE`.`TUTORIAL` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `TutorialNum` VARCHAR(4) NOT NULL,
  `FName` VARCHAR(45) NULL,
  `LName` VARCHAR(45) NULL,
  `Phone` VARCHAR(45) NULL,
  `Office` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  PRIMARY KEY (`CourseNum`, `TutorialNum`),
  CONSTRAINT `TUTORIAL`
    FOREIGN KEY (`CourseNum` , `TutorialNum`)
    REFERENCES `COURSE_OUTLINE`.`SECTION` (`CourseNum` , `SectionNumber`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);
    
DROP TABLE if Exists TIMETABLE;
CREATE TABLE `COURSE_OUTLINE`.`TIMETABLE` (
  `CourseNum` VARCHAR(10) NOT NULL,
  `SectionNum` VARCHAR(4) NOT NULL,
  `Days` VARCHAR(45) NULL,
  `Time` VARCHAR(45) NULL,
  `Location` VARCHAR(45) NULL,
  PRIMARY KEY (`CourseNum`,`SectionNum`),

  CONSTRAINT `TIMETABLE`
    FOREIGN KEY (`CourseNum` , `SectionNum`)
    REFERENCES `COURSE_OUTLINE`.`SECTION` (`CourseNum` , `SectionNumber`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);







