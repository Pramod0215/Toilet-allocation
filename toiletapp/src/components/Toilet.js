import React, { Component } from 'react';

 
class Addlist extends Component {
    constructor(props){
      super(props);
      this.state={
        toiletName:'',
        gender:'',
        location:'',
        chargable:'',
        age:''
      }
      this.onSubmit = this.onSubmit.bind(this)
    //   this.onCancel = this.onCancel.bind(this)
    }
      onSubmit(toiletName, gender, location,chargable,age ){
        this.props.detailsinfo(toiletName, gender, location,chargable,age);
        this.setState({
            toiletName:'',
            gender:'',
            location:'',
            chargable:'',
            age:''
  
        })
      }
  
    render() {
    //   console.log("Editings:", this.props.data)
      return (
        <div className="App">
        Toilet Name : <input type='text' onChange={()=>this.setState({toiletName:event.target.value})} value={this.state.toiletName}/><br></br>
        Gender:  <input type='text' onChange={()=>this.setState({gender:event.target.value})}value={this.state.gender}/><br></br>
        Location:  <input type='text' onChange={()=>this.setState({location:event.target.value})} value={this.state.location}/><br></br>
        Chargable:  <input type='text' onChange={()=>this.setState({chargable:event.target.value})}value={this.state.chargable}/><br></br>
        Age:  <input type='text' onChange={()=>this.setState({age:event.target.value})} value={this.state.age}/><br></br>
        <button onClick={()=>this.onSubmit(this.state.toiletName, this.state.gender, this.state.location,this.state.chargable,this.state.age)}> submit</button>
       
          
        </div>
      );
    }
  }
  
  class Toilet extends Component {
    constructor(props){
      super(props);
      this.state={
        toiletName:'',
        gender:'',
        location:'',
        chargable:'',
        age:'',
        toiletList:[
            {
               'toiletName':'spm',
               'gender':'Male',
                'location':'btm',
                'chargable':'free',
                'age':'12+',
            },
            {
                'toiletName':'spm',
                'gender':'Male',
                 'location':'btm',
                 'chargable':'Paid',
                 'age':'12+',
             },
            {
                'toiletName':'sdm',
               'gender':'Male',
                'location':'btm',
                'chargable':'free',
                'age':'12-',
            },
            {
                'toiletName':'sqm',
                'gender':'Female',
                 'location':'btm',
                 'chargable':'free',
                 'age':'12+',
             },
             {
                'toiletName':'spm',
                'gender':'Male',
                 'location':'btm',
                 'chargable':'Paid',
                 'age':'12+',
             },
        ]
      }
      this.addDetails = this.addDetails.bind(this);
    }
    addDetails(toiletName, gender, location,chargable,age )
    {
      this.setState({
        toiletList: [...this.state.toiletList,{toiletName:toiletName, gender:gender, location:location,chargable:chargable,age:age}]
      });
    }

    sendToilet(){
        this.props.get_toilet(this.state.toiletList);
    }

    render() {
      return (
         
        <div className="App">

          <Addlist detailsinfo={this.addDetails}/>
          {console.log(this.state.toiletList)};
          <table>
            <thead>
              <tr>
              <th>Toilet Name</th>
              <th>Gender</th>
              <th>Location</th>
              <th>Chargable</th>
              <th>Age</th>
              </tr>
             
            </thead>
            <tbody>
              {this.state.toiletList.map((item,index)=>(<tr key={index}>
              <td>{item.toiletName}</td>
              <td>{item.gender}</td>
              <td>{item.location}</td>
              <td>{item.chargable}</td>
              <td>{item.age}</td>
              </tr>))}
            </tbody>
          </table>
          
        </div>
      );
    }
  }
  
  export default Toilet;;