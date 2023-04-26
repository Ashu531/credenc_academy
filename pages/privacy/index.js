import React, { useEffect, useRef } from 'react'
import pointerIcon from '../../assets/images/icons/caret-right-icon.svg';
import Image from "next/image";
import Header from '../../components/header/Header'
import { useRouter } from 'next/router'
import Head from 'next/head'
// import { shouldNavbarVisible } from '../../services/shouldNavbarVisible';
// import ProfileHeader from '../profilePage/ProfileHeader';

const whyDoWeStoreData = [
    `To contact you with newsletters, marketing or promotional materials, 
    and other related information, that may be of interest to you.`,

    `To send you updates about programs (including but not limited to 
        course start dates, new course notifications, etc.), Platform 
        maintenance, or new services provided by us, among other things, 
        through itself or through third parties, via WhatsApp, email, SMS, 
        phone call or other medium.`,
    `For analysis purpose so that we can enhance the quality of our 
    contents and Platform;`,
    `Compliance with security and other mandatory policies, as required or
    permitted by law;`,
    `Internal record keeping;`,
    `To allow you to participate in interactive features of our Platform;`,
    `To monitor the usage of our Service;`,
    `To analyze trends, traffic, and track usage data;`,
    `To detect and address technical issues`,
    `Process and/or redirect your requests and orders for various courses;`,
    `Manage your account and account preferences and personalize your 
    experience;`,
    `Solicit feedbacks, reviews, upvote and/or downvote, etc.;`,
    `For communicating with you, including but not limited to responding 
    to your queries;`,
    `As we in our sole discretion, determine to be necessary to ensure the 
    safety and integrity of our users, employees, third parties, and/or our 
    Platform.`
]

const rightsPointer = [
    `Right to request a copy of your personal data which we hold about you;`, 
    `Right to rectification of any personal data, if it is found to be inaccurate 
    or out of date;`, 
    `Right to erasure of your personal data which we hold about you;`, 
    `Right to withdraw your consent at any time, to the processing of your 
    personal data;`, 
    `Right to object to the processing of personal data`,
]

export default function PrivacyPolicy(props) {

    let disclaimerRef = useRef();
    let location = useRouter();

    const getWebsiteLink = (url) => {
        return <a style={{color: '#000000', fontStyle: 'italic',textDecoration: 'none'}} href={url} target='_blank' rel="noreferrer noopener">skillrush.credenc.com</a>
    };

    const renderUnderLine = () => <span className='underline'></span>

    const renderParaHeading = (text) => <h4 className='para-heading'>{text}</h4>

    const renderPointerPara = (subheading='', text) => {
        return <div className='pointer-para'>
            <div style={{marginTop: 5,marginRight: 10}}>
            <Image src={pointerIcon} objectFit="cover" height={16} width={16} />
            </div>
            <span className='para'><i>{!!text ? subheading : ''}</i>{!text ? subheading : text}</span>
        </div>
    }

    const renderEmail = (text) => {
        return <a className='email' href={`mailto:${text}`}>{text}</a>
    }

    useEffect(() => {
        // changeNavbarVisibility(shouldNavbarVisible());
        if (location.pathname === '/disclaimer') disclaimerRef.current.scrollIntoView();    
    }, [])

    useEffect(() => {
        location.beforePopState(({ as }) => {
            if (as !== location.asPath) {
                location.push('/')
            }
            return true;
        });
    
        return () => {
            location.beforePopState(() => true);
        };
    }, [location]);

  return (
    <>
    <Head>
        <title>Privacy Policy</title>
      </Head> 
    <div className='privacy-policy' style={props.profilePage === true ? {display: 'block', paddingTop:'2rem'} : {display: 'block'}} >
        <h3 className='heading' style={{textAlign:"center"}}>Privacy Policy</h3>
        <span className='date'>This Privacy Policy was last revised on 11 April, 2022</span>
        <span className='para'>
            This Privacy Policy <b>(“Policy”)</b> explains how {getWebsiteLink('https://credencacademy.com/?')}, also 
            known as skillrush, owned and operated by Credenc Web Technologies 
            Private Limited <b>(“Company”, “Credenc”, “we”, “us”, “our”)</b> collects and 
            uses your information <b>(“User”, “you”, “your”)</b> in relation to your access 
            and usage of the course aggregator and marketplace platform <b>(“Services”)</b>, 
            provided to you on the website/domain/app (collectively referred to as the 
            <b>“Platform”)</b>.
        </span>
        <span className='para'>
            In this Policy, “Personal Information” or “Personally Identifiable Information”
            means that can be used to identify a person directly or indirectly, either 
            from that information alone or from that information combined with other 
            information we have access to, about that individual. 
        </span>
        <span className='para'>
            If you have any questions or concerns regarding this Policy, you should 
            contact our Grievance Office at {renderEmail('legal@credenc.com')}. 
        </span>
        <span className='para bold italic'>
            This Policy is published pursuant to, and in compliance with the 
            Information Technology Act, 2000, and the rules thereunder, more 
            specifically the Information Technology (Reasonable Security 
            Practices and Procedures and Sensitive Personal Data or Information) 
            Rules, 2011.
        </span>
        {renderUnderLine()}
        {renderParaHeading('CONSENT')}
        <span className='para'>
            By accessing and registering to our Platform, we shall understand that you 
            are aware of this Policy, its contents, and have provided your informed 
            consent to process your information as provided. You accordingly agree and 
            consent to us collecting, storing, processing, transferring, and sharing your 
            Personal Information, including the sensitive personal data, with third 
            parties, partners, service providers for the purposes set out in this Policy.
        </span>
        {renderUnderLine()}
        {renderParaHeading('TYPES OF DATA COLLECTED')}
        <span className='para'>
            While using our Service, we may ask you to provide us with certain 
            Personally Identifiable Information that can be used to identify you. 
            Collection of such data and information is essential for the purpose of 
            serving the best version of our Service and Platform. We may collect the 
            below mentioned information:    
        </span>
        {renderPointerPara(`Personal Information: `, `We may collect Personal Information including, but
            not limited to name, e-mail address, mobile number, account login 
            information, photographs, work experience level, and any other 
            information we consider necessary to enhance your experience on the 
            Platform.`)
        }
        {renderPointerPara(`Usage data: `, `We may collect information that your browser sends 
            whenever you visit our Platform and/or use the Services by or through 
            any device. The usage data includes, but is not limited to IP address, 
            country of accessing the Platform, browser type & version, login 
            credentials, the time and date of your visit on the Platform, words 
            searched for, bookmarks, sign-up session time log, etc.`)
        }
        {renderPointerPara(`Marketing & behavioural data: `, `We may collect and store information that
            is your preferences in receiving marketing information from us, and the 
            assumed information pertaining to your interest and behaviour based on
            your activity on our Platform.`)
        }
        {renderUnderLine()}
        {renderParaHeading('WHY DO WE STORE DATA?')}
        <span className='para'>
            We may use the information shared by you during your visit on the 
            Platform, registration of your account, and/or your use of the Platform. We 
            shall not be responsible for the authenticity of the Personal Information as 
            provided by you. We store data for the below mentioned reasons:
        </span>
        {renderPointerPara(`To contact you with newsletters, marketing or promotional materials, 
            and other related information, that may be of interest to you.`)
        }
        {renderPointerPara(`To send you updates about programs (including but not limited to 
            course start dates, new course notifications, etc.), Platform 
            maintenance, or new services provided by us, among other things, 
            through itself or through third parties, via WhatsApp, email, SMS, 
            phone call or other medium.`)
        }
        {renderPointerPara(`For analysis purpose so that we can enhance the quality of our 
            contents and Platform;`)
        }
        {renderPointerPara(`Compliance with security and other mandatory policies, as required or
            permitted by law;`)
        }
        {renderPointerPara(`Internal record keeping;`)}
        {renderPointerPara(`To allow you to participate in interactive features of our Platform;`)}
        {renderPointerPara(`To monitor the usage of our Service;`)}
        {renderPointerPara(`To analyze trends, traffic, and track usage data; `)}
        {renderPointerPara(` detect and address technical issues`)}
        {renderPointerPara(`Process and/or redirect your requests and orders for various courses;`)}
        {renderPointerPara(`Manage your account and account preferences and personalize your 
            experience;`)}
        {renderPointerPara(`Solicit feedbacks, reviews, upvote and/or downvote, etc.;`)}
        {renderPointerPara(`For communicating with you, including but not limited to responding 
            to your queries;`)}
        {renderPointerPara(`As we in our sole discretion, determine to be necessary to ensure the 
            safety and integrity of our users, employees, third parties, and/or our 
            Platform.`)}
        {renderUnderLine()}
        {renderParaHeading('DATA RETENTION')}
        <span className='para'>
            We will only retain your Personal Information for as long as it is necessary 
            for the purposes set out in this Policy. We will retain and use your Personal 
            Data to the extent necessary to fulfil our obligations with respect to the 
            Services offered by us and/or to comply with legal and regulatory 
            obligations authorized by law.
        </span>
        <span className='para'>
            We will only retain your usage data for internal analysis purposes. Usage 
            data is generally retained for a shorter period, except when this data is used 
            to strengthen the security or to improve the functionality of our Service, or 
            we are legally obligated to retain this data for longer time periods. 
        </span>
        {renderUnderLine()}
        {renderParaHeading('CONFIDENTIALITY')}
        <span className='para'>
            Your information is regarded as confidential and therefore will not be 
            divulged to any third party, unless if legally required to do so to the 
            appropriate authorities, or for the purpose related to the Services offered by 
            us. We will not sell, share, or rent your Personal Information to any third 
            party, except as mentioned in “Disclosure of Data”, or use your e-mail 
            address for unsolicited mail. Any emails sent by us will only be in 
            connection with the provision of agreed Services, and you retain sole 
            discretion to seek for discontinuation of such communications at any point 
            of time.
        </span>
        {renderUnderLine()}
        {renderParaHeading('DISCLOSURE OF DATA')}
        {renderPointerPara(`Law and order: `, `We reserve the right to use or disclose your personal 
            data in response to any statutory or legal requirements. We will disclose 
            your personal data if we believe it is necessary to share information in 
            order to investigate, prevent, or take action regarding illegal activities, 
            suspected fraud, violations of the Platform’s other policies, or as 
            otherwise required by law when responding to court orders and other 
            legal process.`)}
        {renderPointerPara(`Third-party service providers: `, `For the purpose of making available our 
            Services, we may engage with third parties and/or service providers, and
            they may have access to your Personal Information. However, they are 
            obligated to not disclose or use the information for any other purpose.`)}
        {renderPointerPara(`Other disclosures: `, `We may also disclose your personal data to our 
            subsidiaries and affiliates, for any other purpose disclosed by us when 
            you provide the information, and with your consent in any other cases.`)}
        {renderUnderLine()}
        {renderParaHeading('LINK TO OTHER SITES')}
        <span className='para'>
            Our Service may contain links to other sites that are not operated by us. If 
            you click on a third-party link, you will be redirected to that third party’s 
            site. We strongly advise you to review the privacy policy of every site you 
            visit.
        </span>
        <span className='para'>
            We have no control over and assume no responsibility for the content, 
            privacy policies and/or procedures of any third-party sites or services. 
        </span>
        {renderUnderLine()}
        {renderParaHeading('SECURITY')}
        <span className='para'>
            We value your trust in providing us your Personal Information, thus we are 
            striving to use commercially acceptable means of protecting it. We 
            undertake reasonable security practices and procedures designed to protect 
            such information from unauthorized access, damage, use, modification, 
            disclosure or impairment. But remember that no method of transmission 
            over the internet, or method of electronic storage is 100% secure and 
            reliable, and we cannot guarantee its absolute security.
        </span>
        <span className='para'>
            In accordance with Information Technology Act, 2000 and rules made 
            thereunder, the name and contact details of the Grievance Officer are 
            provided below:
        </span>
        <div className='signature'>
            <span>Name: <i>Shijin Abraham</i></span>
            <span>Address: <i>3rd Floor, Tower-B, DLF Building No. 8, DLF Cyber City, Gurugram, 
                Haryana, India-122002</i>
            </span>
            <span>e-mail: {renderEmail('legal@credenc.com')}.</span>
        </div>
        <span className='para bold italic'>
            This Policy is published pursuant to, and in compliance with the 
            Information Technology Act, 2000, and the rules thereunder, more 
            specifically the Information Technology (Reasonable Security 
            Practices and Procedures and Sensitive Personal Data or Information) 
            Rules, 2011.
        </span>
        {renderUnderLine()}
        {renderParaHeading('CONSENT')}
        <span className='para'>
            By accessing and registering to our Platform, we shall understand that you 
            are aware of this Policy, its contents, and have provided your informed 
            consent to process your information as provided. You accordingly agree and 
            consent to us collecting, storing, processing, transferring, and sharing your 
            Personal Information, including the sensitive personal data, with third 
            parties, partners, service providers for the purposes set out in this Policy.
        </span>
        {renderUnderLine()}
        {renderParaHeading('TYPES OF DATA COLLECTED')}
        <span className='para'>
            While using our Service, we may ask you to provide us with certain 
            Personally Identifiable Information that can be used to identify you. 
            Collection of such data and information is essential for the purpose of 
            serving the best version of our Service and Platform. We may collect the 
            below mentioned information:
        </span>
        {renderPointerPara(`Personal Information: `, `We may collect Personal Information including, but
            not limited to name, e-mail address, mobile number, account login 
            information, photographs, work experience level, and any other 
            information we consider necessary to enhance your experience on the 
            Platform.`)}
        {renderPointerPara(`Usage data: `, `We may collect information that your browser sends 
            whenever you visit our Platform and/or use the Services by or through 
            any device. The usage data includes, but is not limited to IP address, 
            country of accessing the Platform, browser type & version, login 
            credentials, the time and date of your visit on the Platform, words 
            searched for, bookmarks, sign-up session time log, etc.`)}
        {renderPointerPara(`Marketing & behavioural data: `, `We may collect and store information that
            is your preferences in receiving marketing information from us, and the 
            assumed information pertaining to your interest and behaviour based on
            your activity on our Platform.`)}
        {renderUnderLine()}
        {renderParaHeading('WHY DO WE STORE DATA?')}
        <span className='para'>
            We may use the information shared by you during your visit on the 
            Platform, registration of your account, and/or your use of the Platform. We 
            shall not be responsible for the authenticity of the Personal Information as 
            provided by you. We store data for the below mentioned reasons:
        </span>
        {whyDoWeStoreData.map(el => renderPointerPara(el))}
        {renderUnderLine()}
        {renderParaHeading('DATA RETENTION')}
        <span className='para'>
            We will only retain your Personal Information for as long as it is necessary 
            for the purposes set out in this Policy. We will retain and use your Personal 
            Data to the extent necessary to fulfil our obligations with respect to the 
            Services offered by us and/or to comply with legal and regulatory 
            obligations authorized by law.  
        </span>
        <span className='para'>
            We will only retain your usage data for internal analysis purposes. Usage 
            data is generally retained for a shorter period, except when this data is used 
            to strengthen the security or to improve the functionality of our Service, or 
            we are legally obligated to retain this data for longer time periods. 
        </span>
        {renderUnderLine()}
        {renderParaHeading('CONFIDENTIALITY')}
        <span className='para'>
            Your information is regarded as confidential and therefore will not be 
            divulged to any third party, unless if legally required to do so to the 
            appropriate authorities, or for the purpose related to the Services offered by 
            us. We will not sell, share, or rent your Personal Information to any third 
            party, except as mentioned in <i>“Disclosure of Data”</i>, or use your e-mail 
            address for unsolicited mail. Any emails sent by us will only be in 
            connection with the provision of agreed Services, and you retain sole 
            discretion to seek for discontinuation of such communications at any point 
            of time.
        </span>
        {renderUnderLine()}
        {renderParaHeading('DISCLOSURE OF DATA')}
        {renderPointerPara(`Law and order: `, `We reserve the right to use or disclose your personal 
            data in response to any statutory or legal requirements. We will disclose 
            your personal data if we believe it is necessary to share information in 
            order to investigate, prevent, or take action regarding illegal activities, 
            suspected fraud, violations of the Platform’s other policies, or as 
            otherwise required by law when responding to court orders and other 
            legal process.`)}
        {renderPointerPara(`Third-party service providers: `, `For the purpose of making available our 
            Services, we may engage with third parties and/or service providers, and
            they may have access to your Personal Information. However, they are 
            obligated to not disclose or use the information for any other purpose.`)}
        {renderPointerPara(`Other disclosures: `, `We may also disclose your personal data to our 
            subsidiaries and affiliates, for any other purpose disclosed by us when 
            you provide the information, and with your consent in any other cases.`)}
        {renderUnderLine()}
        {renderParaHeading('LINK TO OTHER SITES')}
        <span className='para'>
            Our Service may contain links to other sites that are not operated by us. If 
            you click on a third-party link, you will be redirected to that third party’s 
            site. We strongly advise you to review the privacy policy of every site you 
            visit.
        </span>
        <span className='para'>
            We have no control over and assume no responsibility for the content, 
            privacy policies and/or procedures of any third-party sites or services.
        </span>
        {renderUnderLine()}
        {renderParaHeading('SECURITY')}
        <span className='para'>
            We value your trust in providing us your Personal Information, thus we are 
            striving to use commercially acceptable means of protecting it. We 
            undertake reasonable security practices and procedures designed to protect 
            such information from unauthorized access, damage, use, modification, 
            disclosure or impairment. But remember that no method of transmission 
            over the internet, or method of electronic storage is 100% secure and 
            reliable, and we cannot guarantee its absolute security.
        </span>
        <span className='para'>
            In accordance with Information Technology Act, 2000 and rules made 
            thereunder, the name and contact details of the Grievance Officer are 
            provided below:
        </span>
        <div className='signature'>
            <span>Name: <i>Shijin Abraham</i></span>
            <span>Address: <i>3rd Floor, Tower-B, DLF Building No. 8, DLF Cyber City, Gurugram, 
                Haryana, India-122002</i>
            </span>
            <span>e-mail: {renderEmail('legal@credenc.com')}.</span>
        </div>
        {renderUnderLine()}
        {renderParaHeading('YOUR RIGHTS')}
        <span className='para'>
            As per the applicable data protection law, your principal rights are:
        </span>
        {rightsPointer.map(el => renderPointerPara(el))}
        <span className='para'>
            You have the right to exercise any of the above rights by contacting our 
            Grievance Office at {renderEmail('legal@credenc.com')}. Once we receive your request and 
            verify the same satisfactorily, we shall proceed with assisting you on your 
            request.
        </span>
        <span className='para'>
            You may withdraw your consent given for collecting any information and 
            personal data under this Policy and pursuant to use of the Services, at any 
            time by sending an email to the above-mentioned e-mail id. In such an 
            event, we reserve the right to not allow you further the usage of our Platform
            and/or the Services, without any obligations or liability, whatsoever.  
        </span>
        {renderUnderLine()}
        {renderParaHeading('REGULAR REVIEW OF PRIVACY POLICY')}
        <span className='para'>
            We keep our Policy under regular review and may update the same to reflect
            changes to our information related practices. We encourage you to 
            periodically review this page for the latest information on our privacy 
            practices. Your continued use and access of our Platform will be taken as 
            acceptance of the updated Policy.
        </span>
        {renderUnderLine()}
        <span className='para'>
            <b>CONTENT OWNERSHIP:</b> This Policy and the information contained herein 
            is the sole and exclusive property of Credenc Web Technologies Private 
            Limited and shall not be copied, reproduced, or quoted anywhere, whether 
            verbally or in writing, without prior written consent of Credenc Web 
            Technologies Private Limited.
        </span>
        <span className='copyright'>COPYRIGHT: Credenc Web Technologies Private Limited - Year:2022</span>


        <h3 className='heading' style={{marginTop: '2rem'}}>Disclaimer</h3>
        <span className='para' ref={disclaimerRef}>
            The information provided on our site and mobile application (collectively 
            referred to as the “Platform”) is for general informational purposes only.
             The Platform may contain links to other websites or content belonging to 
             or originating from third parties. Such links are not investigated, monitored, 
             or checked for accuracy, validity, and reliability by us. We do not warrant, 
             endorse, guarantee, or assume responsibility for the accuracy or reliability 
             of any information offered by third party websites linked through our Platform. 
             Your use of the Platform is solely at your own risk and we under no circumstance 
             shall have any liability whatsoever with respect to any information provided on 
             our Platform. We strongly advise you to read all the terms and conditions and/or 
             other related policies of the third-party websites linked through our Platform.
        </span>
    </div>
    </>
  )
}
