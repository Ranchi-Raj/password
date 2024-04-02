import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Display from './Display';

export default function Generator() {

    const [checkedItems, setCheckedItems] = React.useState({
        checkbox1: false,
        checkbox3: false
      });

      const [text, setText] = React.useState();

      const [datas,setData]  = React.useState('');
    
      // Function to handle checkbox change
      const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems({
          ...checkedItems,
          [name]: checked
        });
      };

      const handleTextChange = (event) => {
        setText(event.target.value);
      };

      const generate = () =>{
        
        let len = text;

        if(len<8 || len>32)
        {
           toast.error("Length should be between 8 and 32");
           <Toaster/>
            return
        }

        let name = "";
        let num=0,spec=0
        // name = name + String.fromCharCode(Math.floor(Math.random() * (127 - 32)) + 32);
        // name = name + String.fromCharCode(Math.floor(Math.random() * (127 - 32)) + 32).toUpperCase();

        // let num = 0;
        // let spec = 0;

        // if(checkedItems.checkbox1 && checkedItems.checkbox3)
        // {
        //     num = Math.ceil(Math.random()*len)/3
        //     spec = Math.ceil(Math.random()*len)/3
        // }

        // else if(checkedItems.checkbox1 || checkedItems.checkbox3){
        //     if(checkedItems.checkbox1)
        //         num =String.fromCharCode( Math.ceil(Math.random()*len)/2)

        //         if(checkedItems.checkbox3)
        //         spec = String.fromCharCode(Math.ceil(Math.random()*len)/2)
        // }



        // for(let i=0;i<len-num-spec;i++)
        // {
        //     name =( Math.ceil(Math.random()*2)%2===0 ) ? name + String.fromCharCode(Math.floor(Math.random() * (127 - 32)) + 32)

        //     : name + String.fromCharCode(Math.floor(Math.random() * (127 - 32)) + 32).toUpperCase();
        // }

        // for(let i=0;i<num;i++)
        // {
        //     name = name + (Math.floor(Math.random() * (57 - 48 + 1)) + 48).toString();
        // }

        // const specialCharacters = ["!", "@", "#", "$", "%", "^", "&", "*", "?", "-", "+"];
        // const randomIndex = Math.floor(Math.random() * specialCharacters.length);
  

        // for(let i=0;i<spec;i++)
        // {
        //     name = name + specialCharacters[randomIndex];
        // }
        
            const upperC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const lowerC = 'abcdefghijklmnopqrstuvwxyz';
            const numbers = '0123456789';
            const specialC = '!@#$%^&*()_+{}|:<>?-=[]\\;\',./';
        
            name = name + upperC.charAt(Math.floor(Math.random() * len))
            name = name + lowerC.charAt(Math.floor(Math.random() * len))

            len-=2;

            if(checkedItems.checkbox1 && checkedItems.checkbox3){
                num = len/3;
                spec = len/3
            }

            else{
                if(checkedItems.checkbox1)
                    num = len/2;
                else if(checkedItems.checkbox3)
                    spec = len/2;
            }

            for(let i=0;i<len-num-spec;i++){
                let ran = Math.ceil(Math.random()*2);

                name = name + ((ran%2===0)? upperC.charAt(Math.floor(Math.random() * 26)) : 
                    lowerC.charAt(Math.floor(Math.random() * 26)))
            }

            for(let i =0;i<num;i++)
            {
                name = name + numbers.charAt(Math.floor(Math.random() * 10))
            }

            for(let i=0;i<spec;i++)
            {
                name = name + specialC.charAt(Math.floor(Math.random() * specialC.length))
            }

            const chars = name.split('');
            
            for (let i = name.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [chars[i], chars[j]] = [chars[j], chars[i]];
            }
            
            name = chars.join('');
        
        setData(name);
        name =""; 

       // alert(`Number ${checkedItems.checkbox1} Special ${checkedItems.checkbox3}`)

       toast('Generated !', {
        icon: '👏', position:"bottom-center",duration:700
      });
      
      }
    
        const handleCopyClick = () => {
            navigator.clipboard.writeText(datas)

            toast.success("Successfully Copied")
    };
      
    
  return (
    <div>
        <div className='flex justify-center mt-10'>
            <div className='text-center bg-orange-400 px-4 rounded-xl mx-8 dimension overflow-hidden '>
                <Display 
                data={datas}/>
            </div>
            <button className=' bg-blue-400 rounded-lg px-6 mt-2
             hover:bg-blue-700 ease-in duration-300 h-12'onClick={handleCopyClick} >Copy</button>
             <Toaster/>
        </div>
        <div className='flex text-center pt-12 justify-center'>
        <label className='mx-10'>
            <input
            className='rounded-md h-6 w-6 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"'
            type="checkbox"
            name="checkbox1"
            checked={checkedItems.checkbox1}
            onChange={handleCheckboxChange}
            />
            <br/>
            Include 
            <br/>
            Numbers
        </label >
        <br />
        <label>
        <textarea
            placeholder=' Length'
            style={{width:( (window.innerWidth < 500) ? '60px' : '28%'),height:"40px",resize:"none",overflow:'hidden', color:"black"}}
            className=" border border-gray-300 rounded-md p-2 dim"
            value={text} 
            onChange={handleTextChange} 
        />
        <br />
        Enter Length :
        </label>
        {/* <br /> */}
        <label className='mx-10'>
            <input
            className='rounded-xl h-6 w-6 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"'
            type="checkbox"
            name="checkbox3"
            checked={checkedItems.checkbox3}
            onChange={handleCheckboxChange}
            />
            <br/>
            Include 
            <br/>
            Special Chars
        </label>
        
        </div>
        <div className='place-self-center'>
            <button className='flex justify-center mt-12 bg-blue-500 rounded-lg p-2
             hover:bg-blue-700 ease-in duration-300 pad-center'
            onClick={generate}>Generate</button>
        </div>
    </div>    
  )
}
