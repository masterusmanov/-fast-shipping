import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const start = async () => {
  try{
    const PORT = process.env.PORT || 1987;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api')
    await app.listen(PORT, () =>{
      console.log(`${PORT}th port server is running`);
    });
  }catch(error){
    console.log(error);
    
  }
}
start()