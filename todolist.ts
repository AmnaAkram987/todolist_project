import chalkAnimation from "chalk-animation"
import boxen from "boxen"
import inquirer from "inquirer"

class todoapp{
private todoItemlist:string[]=[];
async sleep (){
    await  new Promise((resolve)=>{
        setTimeout(resolve,3000)
    }) 
}
async welcomeScreen() {
    const welcome=chalkAnimation.karaoke(
        boxen(
            `Welcome to our ⤹★ TODO App ★⤸  
            
            .------------------.
            |  [ 1 ] Add       |
            |  [ 2 ] View      |
            |  [ 3 ] Update    |
            |  [ 4 ] Delete    |
            |  [ 5 ] Exit      |
            '------------------'
            `
            ,
            {
                title:"TO DO APP",
                titleAlignment:"center",
                borderStyle:"classic",
                float:"left"
            }
        )
    )
    await this.sleep()
    welcome.stop()
    this.main()
}
async EndScreen(){
const endscreen=chalkAnimation.karaoke(
   'Thanks for using our TO Do App'
)
await this.sleep()
endscreen.stop()
}

async AddTask(){
    const UserInput=await inquirer.prompt([{
        type:"input",
        name:"todoItem",
        message:"Which task do you want to add?",
       // choices:this.todoItemlist
    }
])

this.todoItemlist.push(UserInput.todoItem)
console.log("Task added successfully");
}

async DeleteTask(){
    const UserInput=await inquirer.prompt([{
        type:"list",
        name:"todoItem",
        message:"Which task do you want to  remove?",
        choices:this.todoItemlist
    }
])
const DeletedItemIndex :number=this.todoItemlist.indexOf(
    UserInput.todoItem
);
this.todoItemlist.splice(DeletedItemIndex,1)
console.log(`Task ${UserInput.todoItem} deleted successfully`)
}

async UpdateTask(){
    const UserInput=await inquirer.prompt([{
        type:"list",
        name:"todoItem",
        message:"Which task do you want to  update?",
        choices:this.todoItemlist
    },
    {
        type:"input",
        name:"newtodoItem",
        message:"Enter updated task"
    }
])
const OldTaskIndex:number=this.todoItemlist.indexOf(UserInput.todoItem)
this.todoItemlist[OldTaskIndex]=UserInput.newtodoItem
console.log('Task updated successfully')
}
async main(){ 
    let  BreakLoop:boolean=true;
const todoOperation:string[]=[
"Add",
"View",
"Update",
"Delete",
"Exit",
]
do{
    const userInput = await inquirer.prompt([
        {
          name: "choice",
          type: "list",
          message: "Which operation do  you want to perform?",
          choices: todoOperation,
        },
      ]);
      switch(userInput.choice){
        case todoOperation[0]:
        //await this.Welcomescreen()
        await this.AddTask()
        break;
        case todoOperation[1]:
        console.log(this.todoItemlist)
        break;
        case todoOperation[2]:
            if(this.todoItemlist.length === 0){
                console.log('There is no item to update.')
                continue;
            }
            else{
                await this.UpdateTask()
                break;
            }
        
        case todoOperation[3]:
        if(this.todoItemlist.length === 0){
                console.log('Oops nothing to delete, add something firstly')
                continue;
            }
        else{
               await this.DeleteTask()
               break;
            }
        case todoOperation[4]:
        await this.EndScreen()
        BreakLoop=false
        break;
      }
    }while(BreakLoop)
}
}
const ToDoApp=new todoapp();
ToDoApp.welcomeScreen();





