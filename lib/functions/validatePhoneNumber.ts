export default function validatePhoneNumber(email: string){
    return String(email)
      .toLowerCase()
      .match(
        /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/im
      ) != null;
  }