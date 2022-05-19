
const Validation = (values) => {
    let errors={};
    
    if(!values.id){
        errors.id = 'fill id';
    }
    if(values.id.length !== 9){
        errors.id = 'מס לא תקין';
    }
    // if(values.id.length === 9){
    //     errors.id = 'תעודת זהות תקינה';
    // }
    if(!values.FirstName){
        errors.FirstName = 'fill FirstName';
    }
    if(!values.LastName){
        errors.LastName = 'fill LastName';
    }
    if(!values.city){
        errors.city = 'fill city';
    }
    if(!values.year){
        errors.year = 'fill year';
    }
   return errors;
}

export default Validation