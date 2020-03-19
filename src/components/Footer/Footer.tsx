import React from 'react';
import classes from './Footer.module.scss';
import MainLogo from '../MainLogo'
import SocialMediaIcon from '../SocialMediaIcon'


function Footer(props: { showMap: boolean, showContent: boolean }) {

    return (
        <div className={classes.FooterMain}>
            {props.showMap ? <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.6619746463875!2d71.39407231545269!3d30.13248462136254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b30318e22077f%3A0x3c9c8b5a1f4b7223!2sYAQOOB%20GROUP!5e0!3m2!1sen!2s!4v1584011817170!5m2!1sen!2s"
                height="300"
                frameBorder="0"
                style={{border: 0, width: '100%'}}
                allowFullScreen={false}
                aria-hidden="false"
                tabIndex={0}
                title={"Google Map Location"}
            /> : null}

            {props.showContent ? (
                   <div>
                       <div className={classes.FooterLine}/>
                       <div className={classes.Footer}>
                           <div className={classes.FooterContent}>
                               <div className={classes.Contact}>
                                   <div className={classes.Logo}>
                                       <MainLogo type={'white'}/>
                                   </div>
                                   <div className={classes.Address}>
                                       <div>
                                           <div className={classes.Heading}>Head Office</div>
                                           <div className={classes.Line}>50/C-1 Valencia Town, Lahore.</div>
                                       </div>
                                       <div>
                                           <div className={classes.Heading}>Corporate Office</div>
                                           <div className={classes.Line}>6-D, Industrial Estate, Phase 1, Multan.</div>
                                       </div>
                                   </div>
                                   <div className={classes.Numbers}>
                                       <div>
                                           <div className={classes.Heading}>Email</div>
                                           <div className={classes.Line}>info@yaqoobgroup.com</div>
                                       </div>
                                       <div>
                                           <div className={classes.Heading}>UAN</div>
                                           <div className={classes.Line}>+92 61 111 333 334</div>
                                       </div>
                                       <div>
                                           <div className={classes.Heading}>Landline</div>
                                           <div className={classes.Line}>+92 42 3595 3796</div>
                                       </div>
                                   </div>

                               </div>

                               <div className={classes.SocialMedia}>
                                   <SocialMediaIcon iconSize={"40"}/>
                               </div>
                           </div>
                       </div>
                   </div>
            ) : null}

            <div className={classes.PortalFooter}>
                <div className={classes.Row}>
                    <div className={classes.Column}>
                        &copy; {new Date().getFullYear()} Copy rights are reserved by
                    </div>
                    <div className={classes.Column}>
                        Yaqoob Group of Companies, Pakistan.
                    </div>
                </div>
                <div className={classes.Row}>
                    <div className={classes.Column}>
                        Designed & Developed by:
                    </div>
                    <div className={classes.Column}>
                        Muhammad Ahsan Izhar (Heptfy Solutions)
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer