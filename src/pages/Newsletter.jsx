
import {Form,redirect,useNavigation} from "react-router-dom"
import axios from "axios"
import {toast} from "react-toastify"

const newsletterUrl = "https://www.course-api.com/cocktails-newsletter"

export const action = async({request})=>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  // email kısmına "test@test.com"  yaz . farklı şey yazma router kabul etmiyor.
  

  try {
    const response = await axios.post(newsletterUrl,data)
    console.log(response);
    toast.success(response.data.msg)
    
    return redirect("/") // home sayfasına yönlendiriyoruz

  } catch (error) {
    toast.error(error?.response?.data?.msg);
   
    return error;
  }
  


}

const Newsletter = () => {
  const navigation = useNavigation()
  const isSubmiting = navigation.state === "submiting"

  return (
   <Form className='form' method='POST'  >
    <h4 style={{textAlign:"center",marginBottom:"2rem"}}>out newsletter</h4>
    {/* name */}
    <div className="form-row">
      <label htmlFor="name" className='form-label'>name</label>
      <input type="text" className='form-input' name='name' id='name' required  />
    </div>
    {/* lastName */}
    <div className="form-row">
      <label htmlFor="lastName" className='form-label'>last Name</label>
      <input type="text" className='form-input' name='lastName' id='lastName' required  />
    </div>
    {/* email */}
    <div className="form-row">
      <label htmlFor="email" className='form-label'>email</label>
      <input type="email" className='form-input' name='email' id='email' defaultValue="test@test.com" required />
    </div>
    <button type='submit' className="btn btn-block" style={{marginTop:"0.5rem"}} disabled = {isSubmiting}>{isSubmiting ? "submiting" : "submit"}</button>
   </Form>
  )
}

export default Newsletter
