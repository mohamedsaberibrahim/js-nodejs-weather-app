const request = require("supertest");
const express = require("express");
const should = require("should")
const chai = require('chai');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const router = require("../app/controllers/controller");

const app = express();
const MongoClient = require('mongodb').MongoClient;
app.use(express.urlencoded({ extended: false }));

var requestbody = {};
var response = {
    viewName: "", 
    data : {}, 
    render: function(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};

describe('routes tests', () => {

    describe("index route", function() {
        it("should return Ok", function() {
            request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      });
    });
});

    describe("about route", function() {
        it("should return Ok", function() {
            request(app)
        .get('/about')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      });
    });

    describe("404 route", function() {
        it("should return invalid page", function() {
            request(app)
        .get('/invalid')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
      });

    });

    describe("weather route", function() {
      it("should return Ok", function() {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
}); 

describe('controllers', () => {

    const uri = "mongodb+srv://saber:78563412@cluster0.8dlqg.mongodb.net/weather_app?retryWrites=true&w=majority";
    let db;

    beforeEach(done => {
    MongoClient.connect(uri, { useNewUrlParser: true,
        useUnifiedTopology: true }, (err, _db) => {
        db = _db;
        done(err);
        // console.log('here!', err);
    });
    });

    describe("index controller", function() {
        it("should render index page", function() {
        router.renderHomePage(requestbody, response);
        response.viewName.should.equal("index");
        });

    });

    describe("about controller", function() {
        it("should render about page", function() {
        router.renderAboutPage(requestbody, response);
        response.viewName.should.equal("about");
        });

    });

    describe("404 controller", function() {
        it("should render 404 page", function() {
        router.render404Page(requestbody, response);
        response.viewName.should.equal("404");
        });

    });



    // Db must have a suitable data to match this tests
    describe("Weather controller", function() {
        it("fetching valid", async function() {
            await router.getWeather({body:
                {
                    city: "Cairo",
                    lat: "31.31",
                    lng: "30.12"
                }
            }, response);
            response.viewName.should.equal("index");
            response.data.should.have.property('daily');
        });

        it("fetching API", async function() {
            await router.getWeather({body:
                {
                    city: "Italy",
                    lat: "41.90",
                    lng: "12.49"
                }
            }, response);
            response.viewName.should.equal("index");
            response.data.should.have.property('daily');
        });
        
        it("fetching outdated data", async function() {
                await router.getWeather({body:
                    {
                        city: "London",
                        lat: "51.5",
                        lng: "-0.11"
                    }
                }, response);
                response.viewName.should.equal("index");
                response.data.should.have.property('daily');
                });
        });

});
