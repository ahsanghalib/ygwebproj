import React, {useState} from 'react';
import classes from './Career.module.scss'
import TextField from '@material-ui/core/TextField'
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Image from '../../components/Image'
import career from '../../assets/images/career.png'
import Paper from '@material-ui/core/Paper'
import * as yup from 'yup'
import {axiosClient, axiosEmail, body, careerFormHtmlEmail, careerFormTextEmail} from '../../helpers'
import Loader from '../../components/Loader'
import FormRender, {FormErrors} from '../../hoc/FormRender'

interface CareerForm {
    fullName: string;
    dob: Date | null | string;
    gender: string;
    maritalStatus: string;
    address: string;
    city: string
    country: string;
    phone: string;
    email: string;
    highestQualification: string;
    education: string;
    institution: string;
    status: string;
    workHistory: string;
    experience: string;
    strengths: string;
    disability: string;
}

const validateSchema = yup.object().shape<CareerForm>({
    fullName: yup.string().required('Required.'),
    email: yup.string().required('Required.').email("Enter valid email address"),
    phone: yup.string().required('Required.'),
    workHistory: yup.string().required('Required.'),
    strengths: yup.string().required('Required.'),
    status: yup.string().required('Required.'),
    maritalStatus: yup.string().required('Required.'),
    institution: yup.string().required('Required.'),
    highestQualification: yup.string().required('Required.'),
    experience: yup.string().required('Required.'),
    education: yup.string().required('Required.'),
    address: yup.string().required('Required.'),
    country: yup.string().required('Required.'),
    city: yup.string().required('Required.'),
    dob: yup.string().required('Required').nullable(true),
    gender: yup.string().required('Required'),
    disability: yup.string().required('Required')
})


const Career: React.FC = props => {

    const formInitValues: CareerForm = {
        address: '',
        city: '',
        country: 'Pakistan',
        dob: null,
        education: '',
        email: '',
        experience: '',
        fullName: '',
        gender: 'Male',
        highestQualification: 'Diploma (Post Matric)',
        institution: '',
        maritalStatus: 'Married',
        phone: '',
        status: 'Un-Employed',
        strengths: '',
        workHistory: '',
        disability: 'No'
    }

    const formErrorsInit: FormErrors<CareerForm> = {
        address: '',
        city: '',
        country: '',
        dob: '',
        education: '',
        email: '',
        experience: '',
        fullName: '',
        gender: '',
        highestQualification: '',
        institution: '',
        maritalStatus: '',
        phone: '',
        status: '',
        strengths: '',
        workHistory: '',
        disability: ''
    }

    const [formValues, setFormValues] = useState<CareerForm>(formInitValues);
    const [showResponse, setShowResponse] = useState<{ error: boolean, text: string }>({error: false, text: ''})
    const [showLoader, setShowLoader] = useState<boolean>(false)

    const handleSubmit = async (values: CareerForm) => {
        try {
            setShowLoader(true)

            const emailId = await axiosEmail().post('/email', body(
                values.fullName,
                values.email,
                `${values.fullName} - ${values.education} - (Resume)`,
                careerFormHtmlEmail(
                    values.fullName,
                    values.dob,
                    values.gender,
                    values.maritalStatus,
                    values.address,
                    values.city,
                    values.country,
                    values.phone,
                    values.email,
                    values.highestQualification,
                    values.education,
                    values.institution,
                    values.status,
                    values.workHistory,
                    values.experience,
                    values.disability,
                    values.strengths
                ),
                careerFormTextEmail(
                    values.fullName,
                    values.dob,
                    values.gender,
                    values.maritalStatus,
                    values.address,
                    values.city,
                    values.country,
                    values.phone,
                    values.email,
                    values.highestQualification,
                    values.education,
                    values.institution,
                    values.status,
                    values.workHistory,
                    values.experience,
                    values.disability,
                    values.strengths
                )
            ))

            await axiosClient().post('/career', {
                ...values,
                emailId: emailId.data.messageId,
                clientTime: new Date().toString()
            })

            setShowResponse({error: false, text: 'Thanks for your feedback. Our team will contact you shortly.'})
            setShowLoader(false)


        } catch (err) {
            setShowResponse({error: true, text: 'Sorry, Something went wrong, please call us or retry.'})
            setShowLoader(false)

        }
    }

    const handleDateChange = (date: Date | null) => {
        setFormValues({
            ...formValues,
            dob: new Date(date !== null ? date : new Date()).toDateString()
        })
    }

    return (
        <div>
            {showLoader ? <Loader/> : null}
            <div className={classes.Hero}/>
            <div className={classes.Container}>
                <div className={classes.FormSection}>
                    <div className={classes.Image}>
                        <Image src={career} alt={"Career Job"}/>
                    </div>
                    <Paper className={classes.Outer}>
                        {showResponse.text !== '' ?
                            (<div style={{color: `${showResponse.error ? 'red' : 'green'}`, fontSize: '1rem'}}>
                                {showResponse.text}
                            </div>) : null}
                        <FormRender
                            initValues={formInitValues}
                            initErrors={formErrorsInit}
                            validateSchema={validateSchema}
                            onSubmit={handleSubmit}
                            setFormValues={setFormValues}
                            formValues={formValues}
                            render={bag => {
                                return (
                                    <form onSubmit={bag.onSubmit} onReset={bag.onReset}>
                                        <TextField
                                            id="fullName"
                                            label={"Full Name"}
                                            name="fullName"
                                            variant="standard"
                                            margin={'dense'}
                                            value={bag.values.fullName}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            helperText={bag.errors.fullName !== '' ? bag.errors.fullName : ' '}
                                            error={bag.errors.fullName !== ''}
                                        />

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                disableFuture={true}
                                                openTo="year"
                                                format="dd-MMM-yyyy"
                                                label={"Date of Birth"}
                                                views={["year", "month", "date"]}
                                                name={"dob"}
                                                id={"dob"}
                                                value={bag.values.dob}
                                                onChange={handleDateChange}
                                                helperText={bag.errors.dob !== '' ? bag.errors.dob : ' '}
                                                error={bag.errors.dob !== ''}
                                            />
                                        </MuiPickersUtilsProvider>

                                        <FormControl style={{minWidth: '120px'}}>
                                            <InputLabel id="gender-label">Gender</InputLabel>
                                            <Select
                                                labelId="gender-label"
                                                id="gender"
                                                name="gender"
                                                value={bag.values.gender}
                                                onChange={bag.onChange}
                                            >
                                                <MenuItem value={'Male'}>Male</MenuItem>
                                                <MenuItem value={'Female'}>Female</MenuItem>
                                            </Select>
                                            <FormHelperText>{bag.errors.gender !== '' ? bag.errors.gender : ' '}</FormHelperText>
                                        </FormControl>

                                        <FormControl style={{minWidth: '120px'}}>
                                            <InputLabel id="marital-label">Marital Status</InputLabel>
                                            <Select
                                                labelId="marital-label"
                                                id="maritalStatus"
                                                name="maritalStatus"
                                                value={bag.values.maritalStatus}
                                                onChange={bag.onChange}
                                            >
                                                <MenuItem value={'Married'}>Married</MenuItem>
                                                <MenuItem value={'Un-Married'}>Un-Married</MenuItem>
                                            </Select>
                                            <FormHelperText>{bag.errors.maritalStatus !== '' ? bag.errors.maritalStatus : ' '}</FormHelperText>
                                        </FormControl>

                                        <TextField
                                            label="Address"
                                            id="address"
                                            name="address"
                                            variant="standard"
                                            margin={'dense'}
                                            value={bag.values.address}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            helperText={bag.errors.address !== '' ? bag.errors.address : ' '}
                                            error={bag.errors.address !== ''}
                                        />

                                        <TextField
                                            label="City"
                                            id="city"
                                            name="city"
                                            variant="standard"
                                            margin={'dense'}
                                            value={bag.values.city}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            helperText={bag.errors.city !== '' ? bag.errors.city : ' '}
                                            error={bag.errors.city !== ''}
                                        />

                                        <TextField
                                            label="Country"
                                            id="country"
                                            name="country"
                                            variant="standard"
                                            margin={'dense'}
                                            value={bag.values.country}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            helperText={bag.errors.country !== '' ? bag.errors.country : ' '}
                                            error={bag.errors.country !== ''}
                                        />

                                        <TextField
                                            label="Phone / Mobile No."
                                            id="phone"
                                            name="phone"
                                            variant="standard"
                                            margin={'dense'}
                                            value={bag.values.phone}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            helperText={bag.errors.phone !== '' ? bag.errors.phone : ' '}
                                            error={bag.errors.phone !== ''}
                                        />

                                        <TextField
                                            label="Email"
                                            id="email"
                                            name="email"
                                            variant="standard"
                                            margin={'dense'}
                                            value={bag.values.email}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            helperText={bag.errors.email !== '' ? bag.errors.email : ' '}
                                            error={bag.errors.email !== ''}
                                        />

                                        <FormControl style={{minWidth: '120px'}}>
                                            <InputLabel id="edu-level-label">Highest Level of Qualification</InputLabel>
                                            <Select
                                                labelId="edu-level-label"
                                                id="highestQualification"
                                                name="highestQualification"
                                                value={bag.values.highestQualification}
                                                onChange={bag.onChange}
                                            >
                                                <MenuItem value={'Diploma (Post Matric)'}>Diploma (Post
                                                    Matric)</MenuItem>
                                                <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                                                <MenuItem value={'Graduation'}>Graduation</MenuItem>
                                                <MenuItem value={'Diploma (Post Graduation)'}>Diploma (Post
                                                    Graduation)</MenuItem>
                                                <MenuItem value={'Masters'}>Masters</MenuItem>
                                                <MenuItem value={'MSc (Hons) Agri'}>MSc (Hons) Agri</MenuItem>
                                                <MenuItem value={'BSc (Hons) Agri'}>BSc (Hons) Agri</MenuItem>
                                                <MenuItem value={'M. Phil'}>M. Phil</MenuItem>
                                                <MenuItem value={'Doctorate'}>Doctorate</MenuItem>
                                            </Select>
                                            <FormHelperText>{bag.errors.highestQualification !== '' ? bag.errors.highestQualification : ' '}</FormHelperText>
                                        </FormControl>

                                        <TextField
                                            label="Highest Qualification"
                                            id="education"
                                            name="education"
                                            variant="standard"
                                            margin={'dense'}
                                            value={bag.values.education}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            helperText={bag.errors.education ? bag.errors.education : ' '}
                                            error={bag.errors.education !== ''}
                                        />

                                        <TextField
                                            label="Institution / University"
                                            id="institution"
                                            name="institution"
                                            variant="standard"
                                            margin={'dense'}
                                            value={bag.values.institution}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            helperText={bag.errors.institution ? bag.errors.institution : ' '}
                                            error={bag.errors.institution !== ''}
                                        />

                                        <FormControl style={{minWidth: '120px'}}>
                                            <InputLabel id="status-label">Current Status</InputLabel>
                                            <Select
                                                labelId="status-label"
                                                id="status"
                                                name="status"
                                                value={bag.values.status}
                                                onChange={bag.onChange}
                                            >
                                                <MenuItem value={'Un-Employed'}>Un-Employed</MenuItem>
                                                <MenuItem value={'Employed'}>Employed</MenuItem>
                                            </Select>
                                            <FormHelperText>{bag.errors.education ? bag.errors.education : ' '}</FormHelperText>
                                        </FormControl>

                                        <TextField
                                            label="Employment Record"
                                            id="workHistory"
                                            name="workHistory"
                                            variant="standard"
                                            multiline={true}
                                            rows={8}
                                            margin={'dense'}
                                            value={bag.values.workHistory}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            error={bag.errors.workHistory !== ''}
                                            helperText={bag.errors.workHistory ? bag.errors.workHistory : `(Starting with your present post, list IN REVERSE ORDER 
                            every employment you have had)`}
                                        />

                                        <TextField
                                            label="Experience in Years"
                                            id="experience"
                                            name="experience"
                                            variant="standard"
                                            margin={'dense'}
                                            value={bag.values.experience}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            helperText={bag.errors.experience ? bag.errors.experience : ' '}
                                            error={bag.errors.experience !== ''}
                                        />

                                        <TextField
                                            label="Disability (if any)"
                                            id="disability"
                                            name="disability"
                                            variant="standard"
                                            margin={'dense'}
                                            value={bag.values.disability}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            helperText={bag.errors.disability ? bag.errors.disability : ' '}
                                            error={bag.errors.disability !== ''}
                                        />

                                        <TextField
                                            label="State your strengths  and reasons why you  should be hired"
                                            id="strengths"
                                            name="strengths"
                                            variant="standard"
                                            multiline={true}
                                            rows={8}
                                            margin={'dense'}
                                            value={bag.values.strengths}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            error={bag.errors.strengths !== ''}
                                            helperText={bag.errors.strengths ? bag.errors.strengths : `(Please  be short and  precise)`}
                                        />

                                        <ButtonGroup className={classes.BtnGroup}>
                                            <Button type={"submit"} variant="outlined" color="primary"
                                                    disableElevation>
                                                Send
                                            </Button>
                                            <Button type={"reset"} variant="outlined" color="default" disableElevation>
                                                Cancel
                                            </Button>
                                        </ButtonGroup>

                                    </form>
                                )
                            }}
                        />
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Career