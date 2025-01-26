# team13
<ol>
<li>B6506100 นางสาวจิดาภา พานคำ</li>
<li>B6506407 นายนภสินธุ์ ทำดี</li>
<li>B6508494 นายกงสวรรค์ จันทบุลี</li>
<li>B6512194 นายวิชิตชัย เพ็งพารา</li>
<li>B6513405 นางสาวปิยธิดา เนนชู</li>
</ol>


> Backend

ติดตั้ง go
```go
go mod init example.com/ชื่อ
```
```go
go get -u github.com/gin-gonic/gin
```
```go
go get -u gorm.io/gorm
```
```go
go get -u gorm.io/driver/sqlite
```
```go
go get -u golang.org/x/crypto@v0.16.0
```
```go
go get -u github.com/golang-jwt/jwt/v4
```
```go
go get github.com/dgrijalva/jwt-go
```

```go
go get github.com/onsi/gomega
```
```go
go get github.com/asaskevich/govalidator
```
```go
go build main.go
```
```go
.\main.exe
```


> Frontend

ติดตั้ง react
```bash
npm create vite@latest ชื่อ
```
```bash
npm install
```
```bash
npm run dev
```
> libary 
```bash
npm i react-router-dom
```
```bash
npm i antd
```
```bash
npm install axios
```
> PDF
```bash
npm install jspdf
```
```bash
npm install html2canvas
```
> ตรวจสอบภาพ
```bash
npm install tesseract.js
```
```bash
npm install date-fns
```
> อนิเมชั่น
```bash
npm install gsap
```


> Git hub command
```bash
git init เริ่มทำ
```
```bash
git add <file_name>
```
```bash
git add . ทั้งหมด
```
```bash
git reset ชื่อไฟล์  ยกเลิกการแก้ไขบางส่วน
```
```bash
git status เช็คบราชว่าอยู่ไหนตอนนี้
```
```bash
git commit -m "message"  คอมมิทปกติ
```
```bash
git commit -m "message - close #0"  คอมมิทและ close task
```
```bash
git clone <URL>
```
```bash
git fetch  
```
```bash
git push origin namebranch
```
```bash
git pull  หรือ git pull origin Namebranch
```
```bash
git branch แสดงชื่อบราชทั้งหมด
```
```bash
git checkout <branch-name>  ไปที่บราชนั้นๆ
```
```bash
git checkout -b <branch-name>  สร้างบราชใหม่และไปที่บราชนั้น
```
```bash
git merge <branch>
```

> Docker
```bash
cd ~/application/
```
```bash
docker compose pull
```
```bash
docker compose down  หยุดการทำงาน
```
```bash
docker image prune -f    ลบ Images ที่มี <none> เป็น Tag เพื่อเคลียร์ข้อมูลเก่า (ถ้าไม่ต้องการเก็บไว้)
```
```bash
docker compose up -d    รันคำสั่ง
```
