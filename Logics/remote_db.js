// DB DRIVER
var DB_NAME = "commenti_blog";
var COLLECTION = "commenti";
var APP_NAME = "valeblog-ofnad";

// ANON LOGIN
var USER_NAME = "anon_user@anon.com";
var USER_PASSWORD = "anon_password";

var LOGGED_IN = false;

const client = stitch.Stitch.initializeDefaultAppClient(APP_NAME);
const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db(DB_NAME);

async function login(email, password){
  console.log("Trying anon login");
  try{
    await client.auth.loginWithCredential(new stitch.UserPasswordCredential(email.toLowerCase(), password));
    console.info("Success.");
  }
  catch(e){
    console.error("db.login", e);
  }
}


async function commentsAdd(arguments){
    console.log("Tryng adding comment");
    try{
      await db.collection(COLLECTION).updateOne({user_id: client.auth.user.id},{$set:{user_id: client.auth.user.id, comments: arguments}},{upsert:true});
      console.log("Done");
    }
    catch(e){
      console.error("db.commentsAdd", e);
    }
}


async function commentsGet(){
   console.log("Tryng get comments");
    try{
      let res = await db.collection(COLLECTION).find({user_id: client.auth.user.id},{_id:0}).asArray();
      localStorage.setItem("comments", JSON.stringify(res));
      console.log("Done");
    }
    catch(e){
      console.error("db.commentsGet", e);
    }
}

async function commentGetAll(){

  if(localStorage.getItem("comments") != null)
  {
    console.log("Comments already loaded");
    return;
  }

  if(!LOGGED_IN){
    await login(USER_NAME, USER_PASSWORD);
  }
  await commentsGet();
}

async function commentSendToDB(){
  if(!LOGGED_IN){
    await login(USER_NAME, USER_PASSWORD);
  }
  await commentsAdd(JSON.parse(localStorage.getItem("comments")));
}
