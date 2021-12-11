import  ReactDOM from "react-dom";
import  React from 'react'

class Index extends React.Component{
    state ={
        second:0,
        minute:0,
        hour: 0,
        startDisapled:false,
        interval:'',
        savedInterval:[]
    }
    startonclickBtn =()=>{

        this.setState({
            startDisapled:true  
        })

     let i = setInterval(()=>{
            const {second,minute,hour,startDisapled} = this.state

            if(second === 59){
                this.setState({
                    second: 0,
                    minute:minute+1
                })
            }else if(minute === 59){
                this.setState({
                    minute: 0,
                    hour:hour+1
                })
            }else{
                this.setState({
                    second:second+1
                })

            }
        },1000)
        this.setState({
            interval:i
        })
    }
    stopOnClick =()=>{
        this.setState({
            startDisapled:false
        })
            clearInterval(this.state.interval)
       
    }
    onclicksavedInterval=()=>{
        const {savedInterval, hour,minute,second}= this.state
        savedInterval.push(hour+':'+minute+':'+second)
        this.setState({
            savedInterval,
        })

    }
    onClearIntervalCliked =()=>{
        this.stopOnClick()
        this.setState({
            second:0,
            minute:0,
            hour:0,
            savedInterval:[]
        })
    }

    render(){
        const {second,minute,hour,startDisapled,savedInterval} = this.state
        return(
         <div className="container">
             <div className="row ">
            <div className="col-md-6 offset-3">
                <div className="card">
                <div className="card-header">
                    <h1>Stop Watch</h1>
                </div>
                <div className="card-body">
                    <h3 className="text-center">{hour}:{minute}:{second}</h3>
                </div>
                <div className="card-footer text-center ">
                    <button className="btn btn-success" onClick={this.startonclickBtn} disabled={startDisapled}>Start</button>
                    <button className="btn btn-warning mx-5"onClick={this.stopOnClick} >Stop</button>
                    <button className="btn btn-info mx-5" onClick={this.onclicksavedInterval} disabled={!startDisapled}>Interval</button>
                    <button className="btn btn-danger " onClick={this.onClearIntervalCliked}>Clear</button>
                </div>
               {savedInterval.map((item,index)=> <p key={index}>{item}</p>)}
                </div>
            </div>
             </div>
         </div>   
        )
    }




}

ReactDOM.render(
    <Index/>,document.getElementById('root')
)