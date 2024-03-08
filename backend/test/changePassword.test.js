const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const { ChangePassword } = require('../controllers/ChangePassword'); // Replace '../controllers/ChangePassword' with the correct path to your code file
chai.use(chaiHttp);

describe('ChangePassword', () => {
  it('should change password successfully when valid email and password are provided.', async () => {
    const plainPassword = "654321000001";

    const request = {
      body: {
        email: "Shann12@gmail.com",
        password: plainPassword,
      },
    };

    const response = {
      status: (statusCode) => ({
        send: (data) => {
          expect(statusCode).to.equal(200);
          expect(data.status_code).to.equal('00');
          expect(data.status_desc).to.equal('success');
          expect(data.message).to.equal('Password changed successfully');
        },
      }),
    };

    await ChangePassword(request, response);
  });

  it('should return an error when empty password is provided', async () => {
    const request = {
      body: {
        email: "Shann12@gmail.com",
        password: "",
      },
    };

    const response = {
      status: (statusCode) => ({
        send: (data) => {
          expect(statusCode).to.equal(400);
          expect(data.status_code).to.equal('01');
          expect(data.status_desc).to.equal('fail');
          expect(data.error).to.equal('Password change failed. Password cannot be empty.');
        },
      }),
    };

    await ChangePassword(request, response);
  });

  it('should return an error when email and password both are empty', async () => {
    const request = {
      body: {
        email: "",
        password: "",
      },
    };

    const response = {
      status: (statusCode) => ({
        send: (data) => {
          expect(statusCode).to.equal(400);
          expect(data.status_code).to.equal('01');
          expect(data.status_desc).to.equal('fail');
          expect(data.error).to.equal('Internal server error');
        },
      }),
    };
    await ChangePassword(request, response);
  });
});
