import * as chai from 'chai';
import { app as server } from '../server.mjs';

const should = chai.should();

(async () => {
    const chaiHttp = await import('chai-http');
    chai.use(chaiHttp.default);

    describe('Lottery Prediction', () => {
        it('it should return "ถูกรางวัล" for number "12"', (done) => {
            chai.request(server)
                .post('/predict')
                .send({ number: '12' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('prediction').eql('ถูกรางวัล');
                    done();
                });
        });

        it('it should return "ไม่ถูกรางวัล" for number other than "12"', (done) => {
            chai.request(server)
                .post('/predict')
                .send({ number: '34' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('prediction').eql('ไม่ถูกรางวัล');
                    done();
                });
        });
    });

    run(); // ต้องเรียกเพื่อเริ่มการทดสอบ
})();
