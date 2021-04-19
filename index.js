const express  = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const client = redis.createClient({
    host: 'redis-server', // ไปหาที่ docker-compose
    port: 6379, 

});
client.set('visits',0);

app.get('/',(req,res)=>{
    process.exit();
    client.get('visits',(err,visits) => {
        res.send('Number of visits is' +  visits);
        client.set('visits', parseInt(visits) +1);
    });
});
app.listen(8081,()=>{
    console.log('Listering on port 8081');
})

/// ผมเริ่มจาก require express และ redis เข้ามาใช้ จากนั้นก็สร้าง web server ด้วย express และผมก็สร้างตัวแปรที่ชื่อว่า client ขึ้นมาเพื่อจะใช้เชื่อมต่อกับ redis server ซึ่งจริงๆ แล้วในส่วนนี้เราจะต้องใส่ข้อมูลของ redis server เข้าไปเพื่อทำการเชื่อมต่อแต่ตอนนี้เรายังไม่มี redis server ดังนั้นก็ปล่อยไว้แบบนี้ก่อนครับ

//จากนั้นผมก็ทำการ set ตัวแปร visits ที่จะอยู่ที่ redis server ให้เท่ากับ 0 ไปก่อน

//จากนั้นผมก็ทำการสร้าง route ให้กับ app ของเราเพื่อที่จะรับ request และเมื่อมีคนเข้ามาที่ route นี้ผมก็จะใช้ตัวแปร client ที่เชื่อมต่อกับ redis server ไว้ทำการ get ค่าตัวแปร visits ที่อยู่ใน redis server 

//เมื่อได้มาแล้วผมก็จะทำการส่ง response กลับไปให้ user โดยส่งกลับไปเป็น String ในบรรทัดที่ 10

//และผมก็ทำการ set value ใหม่เข้าไปที่ ตัวแปร visits ที่ฝั่ง redis server ให้ บวกเข้าไป 1

 //และสุดท้ายผม set ให้ app ของผม listen ที่ port 8081 และก็ทำการ console log ขึ้นมาเมื่อ server start

 //Web app ของเราก็ไม่ได้ ซับซ้อนอะไรนะครับ