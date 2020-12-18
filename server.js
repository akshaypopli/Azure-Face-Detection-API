'use strict';
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require('axios');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const PORT = 4000;
const app = express();

const options = {
    swaggerDefinition: {
        info: {
            title: 'MS Azure Face Detection API',
            version: '1.0.0',
            description: 'API provides information about face from a provided image'
        },
        host: 'localhost:4000',
        basePath: '/'
    },
    apis: ['./server.js']
}

const specs = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Add a valid subscription key and endpoint to your environment variables.
let subscriptionKey = "7ab55b99d2b84ec39b5f73b975167d43";
let endpoint = "hhttps://si-facedetection.cognitiveservices.azure.com//face/v1.0/detect";


 /**
 * @swagger
 * definitions:
 *   Detect faces in an image:
 *     properties:
 *       imageUrl:
 *         type: string
 */
/**
 * @swagger
 * /detectface:
 *    post:
 *      description: Detects the faces in image
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successfully detects the face and provide a array of object containing the coordinates of faces detected in image.
 *          500:
 *              description: Internal server error
 *      parameters:
 *          - name: imageUrl
 *            description: the image url for face detection
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/Detect faces in an image'
 *
 */
app.post("/detectface", async (req, res, next) => {
    let imageUrl = req.body.imageUrl;
    console.log(imageUrl);
    let result = axios({
        method: 'post',
        url: endpoint,
        params : {
            detectionModel: 'detection_02',
            returnFaceId: true
        },
        data: {
            url: imageUrl,
        },
        headers: { 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then(function (response) {
    
        console.log(response.data);
        if(response.data.length!=0){
            res.status(200).json(response.data);
        }else {
            res.status(200).json({
                "face": "No face detected"
            });
        }
    }).catch(function (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    });
});


/**
 * @swagger
 * definitions:
 *   Detect landmarks of faces in an image:
 *     properties:
 *       imageUrl:
 *         type: string
 */
/**
 * @swagger
 * /detectfacelandmarks:
 *    post:
 *      description: Detects the features of faces in image
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successfully detect the face and provide a array of object containing the coordinates of features (ex. nose, mouth, eye, eyebrow etc) of faces detected in image.
 *          500:
 *              description: Internal server error
 *      parameters:
 *          - name: imageUrl
 *            description: the image url for face detection or facelandmarks detection
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/Detect landmarks in faces in an image'
 *
 */
app.post("/detectfacelandmarks", async (req, res, next) => {
    let imageUrl = req.body.imageUrl;
    console.log(imageUrl);
    let result = axios({
        method: 'post',
        url: endpoint,
        params : {
            detectionModel: 'detection_01',
            // returnFaceId: true,
            returnFaceLandmarks: true
        },
        data: {
            url: imageUrl,
        },
        headers: { 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then(function (response) {
    
        console.log(response.data);
        if(response.data.length!=0){
            res.status(200).json(response.data);
        }else {
            res.status(200).json({
                "face": "No face detected"
            });
        }
    }).catch(function (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    });
});

/**
 * @swagger
 * definitions:
 *   Detect emotion of faces in an image:
 *     properties:
 *       imageUrl:
 *         type: string
 */
/**
 * @swagger
 * /detectfaceemotions:
 *    post:
 *      description: Detects the emotions of faces in image
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successfully detects the faces and provide a array of object containing the emotions present on faces in the image.
 *          500:
 *              description: Internal server error
 *      parameters:
 *          - name: imageUrl
 *            description: the image url for face detection or face emotions detection
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/Detect emotions of faces in an image'
 *
 */
app.post("/detectfaceemotions", async (req, res, next) => {
    let imageUrl = req.body.imageUrl;
    console.log(imageUrl);
    let result = axios({
        method: 'post',
        url: endpoint,
        params : {
            detectionModel: 'detection_01',
            // returnFaceId: true,
            // returnFaceLandmarks: false,
            returnFaceAttributes: 'age, gender, headPose'
        },
        data: {
            url: imageUrl,
        },
        headers: { 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then(function (response) {
    
        console.log(response.data);
        if(response.data.length!=0){
            res.status(200).json(response.data);
        }else {
            res.status(200).json({
                "face": "No face detected"
            });
        }
    }).catch(function (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    });
});


/**
 * @swagger
 * definitions:
 *   Detect Similarities between faces in two image:
 *     properties:
 *       imageUrl1:
 *         type: string
 *       imageUrl2:
 *         type: string
 */
/**
 * @swagger
 * /findsimilar:
 *    post:
 *      description: Detects faces in two images are similar or not
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successfully detect the faces and provide an object containing information that two faces are Similar or not.
 *          500:
 *              description: Internal server error
 *      parameters:
 *          - name: imageUrl
 *            description: the url of two images for finding similarity
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/Detect similarity of faces in two images'
 *
 */

app.post("/findsimilar", async (req, res, next) => {
    let imageUrl1 = req.body.imageUrl1;
    let imageUrl2 = req.body.imageUrl2;
    let f_id1 = "";
    let f_id2 = "";
    let azureEndpont = "https://eastus.api.cognitive.microsoft.com/face/v1.0/verify";
    axios({
        method: 'post',
        url: endpoint,
        params : {
            detectionModel: 'detection_02',
            returnFaceId: true
        },
        data: {
            url: imageUrl1,
        },
        headers: { 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then(function (response) {
        f_id1 = response.data[0].faceId;
        console.log(response.data);
        axios({
            method: 'post',
            url: endpoint,
            params : {
                detectionModel: 'detection_02',
                returnFaceId: true
            },
            data: {
                url: imageUrl2,
            },
            headers: { 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey }
        }).then(function (response) {
            f_id2 = response.data[0].faceId;
            axios({
                method: 'post',
                url: azureEndpont,
                data: {
                    faceId1: f_id1,
                    faceId2: f_id2
                },
                headers: { 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey }
            }).then(function (response) {
                res.status(200).json(response.data);
                
            }).catch(function (error) {
                console.log(error);
                res.status(500).json({
                    error
                })
            });
            
        }).catch(function (error) {
            console.log(error)
        });
    }).catch(function (error) {
        console.log(error)
    });
});

app.listen(PORT, () => {
    console.log(`API served at http://localhost:${PORT}`);
});