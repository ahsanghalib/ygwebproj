import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsArray,
  IsBoolean,
} from "class-validator";

export class ContactDto {
  @IsString({ message: "Please enter Full Name" })
  @MinLength(3, { message: "Full Name is too short" })
  @MaxLength(50, { message: "Full Name is too long" })
  public fullName: string;

  @IsEmail({}, { message: "Please provide valid email address" })
  public email: string;

  public phone: string;

  @IsString({ message: "Please enter Subject Line" })
  @MinLength(3, { message: "Subject Line is too short" })
  @MaxLength(100, { message: "Subject Line is too long" })
  public subject: string;

  @IsString({ message: "Please enter Message" })
  @MinLength(3, { message: "Message is too short" })
  @MaxLength(500, { message: "Message is too long" })
  public message: string;

  public timestamp: string;

  @IsString({ message: "Client time is empty" })
  public clientTime: string;

  @IsString({ message: "Email ID is empty" })
  public emailId: string;
}

export class CareerDto {
  @IsString({ message: "Please enter Full Name" })
  @MinLength(2, { message: "Full Name is too short" })
  public fullName: string;

  @IsString({ message: "Please enter Date of Birth" })
  @MinLength(2, { message: "Date of birth too short" })
  public dob: string;

  @IsString({ message: "Please enter Gender" })
  @MinLength(2, { message: "Gender too short" })
  public gender: string;

  @IsString({ message: "Please enter Marital Status " })
  @MinLength(2, { message: "Marital status too short" })
  public maritalStatus: string;

  @IsString({ message: "Please enter address" })
  @MinLength(2, { message: "Address too short" })
  public address: string;

  @IsString({ message: "Please enter city" })
  @MinLength(2, { message: "City too short" })
  public city: string;

  @IsString({ message: "Please enter country" })
  @MinLength(2, { message: "Country too short" })
  public country: string;

  @IsString({ message: "Please enter phone number" })
  @MinLength(2, { message: "Phone too short" })
  public phone: string;

  @IsEmail({}, { message: "Please provide valid email address" })
  public email: string;

  @IsString({ message: "Please enter highest qualifications" })
  @MinLength(1, { message: "Highest Qualification too short" })
  public highestQualification: string;

  @IsString({ message: "Please enter education" })
  @MinLength(1, { message: "Education too short" })
  public education: string;

  @IsString({ message: "Please enter institution" })
  @MinLength(1, { message: "Institution too short" })
  public institution: string;

  @IsString({ message: "Please enter status" })
  @MinLength(2, { message: "Status too short" })
  public status: string;

  @IsString({ message: "Please enter work history" })
  @MinLength(2, { message: "Work history too short" })
  public workHistory: string;

  @IsString({ message: "Please enter experience" })
  @MinLength(2, { message: "Experience too short" })
  public experience: string;

  @IsString({ message: "Please enter strengths" })
  public strengths: string;

  @IsString({ message: "Disability is empty" })
  @MinLength(1, { message: "Disability too short" })
  public disability: string;

  public timestamp: string;

  @IsString({ message: "Client time is empty" })
  @MinLength(2, { message: "Client time too short" })
  public clientTime: string;

  @IsString({ message: "Email ID is empty" })
  @MinLength(2, { message: "Email id too short" })
  public emailId: string;
}

export class UserRegistrationDto {
  @IsString({ message: "Please enter full name" })
  @MinLength(2, { message: "Full Name is too short" })
  public fullName: string;

  @IsEmail({}, { message: "Please enter email address" })
  public email: string;

  @IsString({ message: "Please enter password" })
  @MinLength(8, { message: "Password is too short" })
  public password: string;

  @IsString({ message: "Please enter password" })
  @MinLength(8, { message: "Confirm password is too short" })
  public confirmPassword: string;

  @IsString({ message: "Please enter date of joining" })
  @MinLength(2, { message: "Date of joining is too short" })
  public doj: string;

  @IsString({ message: "Please enter department" })
  @MinLength(2, { message: "Department is too short" })
  public department: string;

  @IsString({ message: "Please enter designation" })
  @MinLength(2, { message: "Designation is too short" })
  public designation: string;

  @IsString({ message: "Please enter role" })
  @MinLength(2, { message: "Role is too short" })
  public role: string;

  @IsArray({ message: "Please give supervisor ids" })
  public supervisorEmail: string[];

  @IsString({ message: "Client time is empty" })
  @MinLength(2, { message: "Client time is too short" })
  public clientTime: string;

  @IsBoolean({ message: "Please enter isActive" })
  public isActive: boolean;
  public timestamp: string;
}

export class EditUserDetail {
  @IsString({ message: "Please enter full name" })
  @MinLength(2, { message: "Full Name is too short" })
  public fullName: string;

  @IsEmail({}, { message: "Please enter email address" })
  public email: string;

  @IsString({ message: "Please enter date of joining" })
  @MinLength(2, { message: "Date of joining is too short" })
  public doj: string;

  @IsString({ message: "Please enter department" })
  @MinLength(2, { message: "Department is too short" })
  public department: string;

  @IsString({ message: "Please enter designation" })
  @MinLength(2, { message: "Designation is too short" })
  public designation: string;

  @IsString({ message: "Please enter role" })
  @MinLength(2, { message: "Role is too short" })
  public role: string;

  @IsArray({ message: "Please give supervisor ids" })
  public supervisorEmail: string[];

  @IsString({ message: "Client time is empty" })
  @MinLength(2, { message: "Client time is too short" })
  public clientTime: string;

  @IsBoolean({ message: "Please enter isActive" })
  public isActive: boolean;

  public timestamp: string;

  public editPassword: boolean;

  public password: string;

  public confirmPassword: string;
}

export class UserLoginDto {
  @IsEmail({}, { message: "Please enter valid email address" })
  public email: string;

  @IsString({ message: "Please enter password" })
  public password: string;
}

export class CheckUserDto {
  @IsString({ message: 'Please give valid JWT token' })
  public jwtToken: string
}