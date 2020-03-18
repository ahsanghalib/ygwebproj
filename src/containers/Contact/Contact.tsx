import React, {useState} from 'react';
import classes from './Contact.module.scss';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import support from '../../assets/images/support.png'
import * as yup from 'yup'
import Image from '../../components/Image'
import Paper from '@material-ui/core/Paper'
import {axiosClient, axiosEmail, body, contactFormHtmlEmail, contactFormTextEmail} from '../../helpers'
import Loader from '../../components/Loader'
import FormRender, {FormErrors} from '../../hoc/FormRender'

interface ContactForm {
    fullName: string
    email: string
    phone?: string
    subject: string
    message: string
}

const validateSchema = yup.object().shape<ContactForm>({
    fullName: yup.string()
        .required('Required.')
        .min(3, 'Full name is too short')
        .max(50, 'Full name maximum characters allowed 50'),
    email: yup.string()
        .required('Required.')
        .email("Enter valid email address"),
    phone: yup.string().notRequired(),
    subject: yup.string()
        .required('Required.')
        .min(3, 'Subject line is too short.')
        .max(100, 'Subject line maximum characters allowed 100'),
    message: yup.string()
        .required('Required.')
        .min(3, 'Message is too short.')
        .max(500, 'Message is too long.')
})


const Contact: React.FC = props => {

    const formInitValues: ContactForm = {
        subject: '',
        email: '',
        fullName: '',
        message: '',
        phone: ''
    }

    const formErrorsInit: FormErrors<ContactForm> = {
        email: '', fullName: '', message: '', subject: '', phone: ''
    }

    const [formValues, setFormValues] = useState<ContactForm>(formInitValues)
    const [showResponse, setShowResponse] = useState<{ error: boolean, text: string }>({error: false, text: ''})
    const [showLoader, setShowLoader] = useState<boolean>(false)

    const handleSubmit = async (value: ContactForm) => {
        try {
            setShowLoader(true)

            const emailId = await axiosEmail().post('/email', body(
                value.fullName,
                value.email,
                `${value.subject} - (Contact Form)`,
                contactFormHtmlEmail(value.fullName, value.message, value.phone),
                contactFormTextEmail(value.fullName, value.message, value.phone)
            ))

            await axiosClient().post('/contact', {
                ...value,
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

    return (
        <div>
            {showLoader ? <Loader/> : null}
            <div className={classes.Hero}/>
            <div className={classes.Container}>
                <div className={classes.FormSection}>
                    <div className={classes.Image}>
                        <Image src={support} alt={"Customer Support"}/>
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
                                            label="Full Name"
                                            id="fullName"
                                            name="fullName"
                                            variant="standard"
                                            margin={'dense'}
                                            value={bag.values.fullName}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            helperText={bag.errors.fullName}
                                            error={bag.errors.fullName !== ''}
                                        />
                                        <TextField
                                            label="Email"
                                            id="email"
                                            name="email"
                                            variant="standard"
                                            margin={'dense'}
                                            value={bag.values.email}
                                            helperText={bag.errors.email}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            error={bag.errors.email !== ''}
                                        />
                                        <TextField
                                            label="Phone Number"
                                            id="phone"
                                            name="phone"
                                            margin={'dense'}
                                            variant="standard"
                                            value={bag.values.phone}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            className={classes.TextFields}
                                            helperText={bag.errors.phone}
                                            error={bag.errors.phone !== ''}
                                        />
                                        <TextField
                                            label="Subject"
                                            id="subject"
                                            name="subject"
                                            variant="standard"
                                            margin={'dense'}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            value={bag.values.subject}
                                            className={classes.TextFields}
                                            helperText={bag.errors.subject}
                                            error={bag.errors.subject !== ''}
                                        />
                                        <TextField
                                            label="Message"
                                            id="message"
                                            name="message"
                                            variant="standard"
                                            margin={'dense'}
                                            multiline={true}
                                            value={bag.values.message}
                                            onChange={bag.onChange}
                                            onBlur={bag.onBlur}
                                            rows={8}
                                            className={classes.TextFields}
                                            helperText={bag.errors.message}
                                            error={bag.errors.message !== ''}
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
                            }}/>


                    </Paper>
                </div>
                <div className={classes.AddressSection}>
                    <div className={classes.AddressBlock}>
                        <div className={classes.Heading}>Head Office:</div>
                        <div className={classes.Line}>50/C-1 Valencia Town, Lahore - Pakistan.</div>
                        <div className={classes.Line}>Ph: +92 42 3595 3796</div>
                        <div className={classes.Line}>Fax: +92 42 3595 3798</div>
                    </div>
                    <div className={classes.AddressBlock}>
                        <div className={classes.Heading}>Corporate Office:</div>
                        <div className={classes.Line}>6-D, Industrial Estate, Phase 1, Multan - Pakistan.</div>
                        <div className={classes.Line}>Ph: +92 61 651 4131</div>
                        <div className={classes.Line}>Fax: +92 61 653 7235</div>
                        <div className={classes.Line}>Mob: +92 300 772 9065</div>
                    </div>
                    <div className={classes.AddressBlock}>
                        <div className={classes.Heading}>Faisalabad Plant:</div>
                        <div className={classes.Line}>Plot # 43, Phase-1A, M3, Industrial City, Faisalabad - Pakistan.
                        </div>
                    </div>
                    <div className={classes.AddressBlock}>
                        <div className={classes.Heading}>Vehari Warehouse:</div>
                        <div className={classes.Line}>8-KM, Multan Road, Vehari - Pakistan.</div>
                        <div className={classes.Line}>Mob: +92 300 772 9059</div>
                    </div>
                    <div className={classes.AddressBlock}>
                        <div className={classes.Heading}>Karachi Office:</div>
                        <div className={classes.Line}>Room No. 201, First Floor, Good Earth Court, Block 13-A,
                            Gulshan e Iqbal, Karachi - Pakistan.
                        </div>
                        <div className={classes.Line}>Ph: +92 21 3483 0236</div>
                    </div>
                    <div className={classes.AddressBlock}>
                        <div className={classes.Heading}>Rahim Yar Khan Warehouse:</div>
                        <div className={classes.Line}>Kissan Textitle Industries, Near Grain Market,
                            Rahim Yar Khan - Pakistan.
                        </div>
                        <div className={classes.Line}>Mob: +92 346 856 0216</div>
                    </div>
                    <div className={classes.AddressBlock}>
                        <div className={classes.Heading}>Sahiwal Warehouse:</div>
                        <div className={classes.Line}>Star Rice Mill, Pakpattan Road, 99/9-L,
                            Bholey Wali Chowk, Sahiwal - Pakistan.
                        </div>
                        <div className={classes.Line}>Ph: +92 40 450 1200</div>
                        <div className={classes.Line}>Ph: +92 40 450 1300</div>
                    </div>
                    <div className={classes.AddressBlock}>
                        <div className={classes.Heading}>Mardan Warehouse:</div>
                        <div className={classes.Line}>Anwar Khan Market Near Bismillah Steel & Cement
                            Dealer, Surkh Dehri Ring Road, Mardan - Pakistan.
                        </div>
                        <div className={classes.Line}>Mob: +92 301 868 0497</div>
                    </div>
                    <div className={classes.AddressBlock}>
                        <div className={classes.Heading}>Hyderabad Warehouse:</div>
                        <div className={classes.Line}>A-23, Near MCB Bank, Site Area, Fateh Chowk,
                            Hyderabad - Pakistan.
                        </div>
                        <div className={classes.Line}>Ph: +92 22 388 5240</div>
                        <div className={classes.Line}>Mob: +92 346 8560255</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact