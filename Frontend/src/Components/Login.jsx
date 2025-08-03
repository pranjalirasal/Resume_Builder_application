import React from 'react'
import { UserContext } from '../Context/UserContext';
import { useNavigate} from 'react-router-dom';
import axiosInstance from '../Utils/axiosInstance';
import { API_PATHS } from '../Utils/apiPaths';

import { authStyles as styles } from '../assets/dummystyle';

const Login =({setCurrentPage}) => {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();

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
          const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
          email,password});
        
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
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>Sign in to buiding resumes</p>
      </div>
      
       {/* form */}
            <form onSubmit={handleLogin} className={styles.form}>
            
            <Input value={email} onChange={({target})=> setEmail(target.value)}
            label='Email'
            placeholder='krsh7@exam.com'
            type='email'/>
      
            <Input value={password} onChange={({target})=> setPassword(target.value)}
            label='Password'
            placeholder='Min 8 character'
            type='password'/>
      
            {error && <div className={styles.errorMessage}>{error}</div>}
            <button type='submit' className={styles.signupSubmit}>
              Create Account
              </button>
              <p className={styles.switchText}>
                Don't have an account{' '}
                <button type='button' onClick={()=>setCurrentPage('Signup')} className={styles.switchButton}>
                  </button>
                </p>
                </form>
                </div>
                
)
}

export default Login
