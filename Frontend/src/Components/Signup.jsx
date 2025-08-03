import React from 'react'
import { authStyles as styles } from '../assets/dummystyle'
import { UserContext } from '../Context/UserContext'
import{UseNavigate} from 'react-router-dom'
import { validateEmail } from '../Utils/helper'
import { API_PATHS } from '../Utils/apiPaths'
 

const Signup=({setCurrentPage})=> {
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp=async(e)=>{
    e.preventDefault();
    if(!fullName){
      setError("Please enter FullName")
      return;
    }
    if(! validateEmail(email)){
      setError('Please enter a valid email address')
      return;
    }
    if(! password){
      setError("Please enter the password")
      return;
    }
    setError('');

    try{
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
      name:fullName,email,password,
    });
    const{token}=response.data;
    if(token){
      localStorage.setItem('token',token);
      updateUser(response.data);
      navigate('/dashboard')
    }
  }
    catch(error){
      setError(error.response?.data?.message || 'something went wrong.please try again')
    }
  }
  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}> join today to build your resume</p>
      </div>
      {/* form */}
      <form onSubmit={handleSignUp} className={styles.signupForm}>
      <Input value={fullName} onChange={({target})=> setFullName(target.value)}
      label='Full Name'
      placeholder='radha'
      type='text'/>

      <Input value={email} onChange={({target})=> setEmail(target.value)}
      label='Email'
      placeholder='radha@exam.com'
      type='email'/>

      <Input value={password} onChange={({target})=> setPassword(target.value)}
      label='Password'
      placeholder='Min 8 character'
      type='password'/>

      {error && <div className={styles.errorMessage}>{error}</div>}
      <button type='submit' className={styles.signupSubmit}>
        Create Account

      </button>

      {/* footer */}
      <p className={styles.switchText}>Already have an account?{' '}
        <button onClick={()=>setCurrentPage('login')}
          type='button' className={styles.signupSwitchButton}>
            Sign In
          </button>
      </p>
      </form>
    </div>
  )
}

export default Signup
