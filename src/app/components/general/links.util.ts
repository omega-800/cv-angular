export const contactMail = (address:string, gender:string, name:string) => {
    let pre:string = gender == 'M' ? "%20Herr" : gender == 'F' ? "%20Frau" :"";
    let mailText:string = `mailto:${address}+?subject=Kontaktanfrage&body=Guten%20Tag${pre}%20${name}.`; 
    window.location.href = mailText;
}

export const contactPhone = (phone:string) => {
    return window.location.href = `tel:${phone}`;
}

export const openLink = (link:string) => {
    window.open(link, '_blank');
}