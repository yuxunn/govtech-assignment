### GovSupply & GovWallet Take-Home Assessment

#### Overview 
The **GovWallet Redemption API** is a **Node.js Express** service that facilitates gift redemptions for teams based off their staff ID as validation. \
Currently, ```main``` branch is the code that minimally satisifies the requirements for this assignment. Branch ```feat-3-test-deployment``` is my attempt at deploying the frontend and backend servers, and is currently a work in progress. 

- Each **staff_pass_id** is mapped to a **team_name**
- Teams can **redeem only once** using any representative from that team. 
- Redemption data is stored in a CSV file for tracking. 

### Features 
🎁 Look up staff_pass_id to verify the team's eligibility for redemption of gift.\
🎁 Check if a team has already redeemed. \
🎁 Record successful redemptions. \
🎁 CSV based data storage.

### Deployed Preliminarily (Branch feat-3-test-deployment for frontend code)
Frontend server (Vercel): https://govtech-assignment.vercel.app/
Backend server (Render): https://govtech-assignment-backend.onrender.com

### Installation and Setup 
1. Clone the repository 
```
git clone https://github.com/yuxunn/govtech-assignment.git
cd govtech-assignment
```
2. Install dependencies \
Install all required Node.js dependencies using the command `npm install`
3. Compile typescript\
To compile the project before running, use the command `npm run build`
4. Start the server \
Run the Express server using `ts-node src/app.ts`. To verify that the server is running, it will display ```Server running on port 3000``` 

### API Endpoints 
### **1️⃣ Check if a Team Can Redeem (GET)**
#### **📌 Endpoint**
```http
GET /api/redeem/:staffPassId
```
####  **📝 Parameters**
| Parameter      | Type     | Description                                      | Required |
|--------------|---------|--------------------------------------------------|----------|
| `staffPassId` | `string` | The unique staff pass ID of the representative. | yes   |

####  **📝 Example**
```http://localhost:3000/api/redeem/STAFF_H12345670G```
| Input                         | Response                                      |
|--------------------------------|-----------------------------------------------|
| `STAFF_H1234567` (valid input) | `{ "message": "Redemption successful for team BASS" }`                        |
| `STAFF_H9999999` (invalid ID)  | `{ "message": "Redemption failed: Staff ID not found." }`|
| `STAFF_H1234567` (already redeemed) | `{ "message": "Redemption failed: Already redeemed." }` |

### Unit Testing
This project includes unit testing using JEST for the adopted key functionalities: 
- Redemption Service (`redemptionService.ts`)
- CSV File Handling (`fileService.ts`)
- API Controller (`redemptionController.ts`)
#### **📌 Running the tests**
- To execute the test cases, use the following command: 
```npm test```
####  **📝 Expected Output*
```
PASS  test/redemptionService.test.ts
PASS  test/fileService.test.ts
PASS  test/redemptionController.test.ts
PASS  test/writeRedemption.test.ts
```


