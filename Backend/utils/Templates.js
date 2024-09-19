const fs = require('fs');
exports.Template1=(eventTitle,eventDate,eventTime,eventLocation)=>{
  const str=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0 auto;
            height:auto;
            padding: 20px;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            font-size: 5rem;
        }
        .event-info {
            background-color: #f2f2f2;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
        p{
            font-size:2.5rem;
        }
        footer {
            text-align: center;
            font-size: 1.5rem;
            color: #666;
            margin-top: 20px;
            padding: 10px;
            border-top: 1px solid #ccc;
            width:100%;
            position:absolute;
            bottom: 0%;
            left: 0%;
            width: 100%;
        }

    </style>
</head>
<body>
    <h1>${eventTitle}</h1>
    <div class="event-info">
        <p><strong>Date:</strong>${eventDate}</p>
        <p><strong>Time:</strong>${eventTime}</p>
        <p><strong>Location:</strong> ${eventLocation}</p>
    </div>
</body>
</html>`
  return str
}

exports.Template2=(eventTitle,eventDate,eventTime,eventLocation)=>{
    const str=`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Event Report</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0 auto;
              height:auto;
              padding: 20px;
          }
        h1 {
            color: #3498db;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            text-align: center;
            font-size: 5rem;
        }
        .event-info {
            display: flex;
            justify-content: space-between;
        }
        p{
            font-size:2.5rem;
        }
          footer {
              text-align: center;
              font-size: 1.5rem;
              color: #666;
              margin-top: 20px;
              padding: 10px;
              border-top: 1px solid #ccc;
              width:100%;
              position:absolute;
              bottom: 0%;
              left: 0%;
              width: 100%;

          }

      </style>
  </head>
  <body>
      <h1>${eventTitle}</h1>
      <div class="event-info">
          <p><strong>Date:</strong>${eventDate}</p>
          <p><strong>Time:</strong>${eventTime}</p>
          <p><strong>Location:</strong> ${eventLocation}</p>
      </div>
  </body>
  </html>`
    return str
  }


exports.Template3=(eventTitle,eventDate,eventTime,eventLocation,images)=>{
    const base64Image = fs.readFileSync(`./uploads/${images[0]}` ,'base64');
    const imgSrc = `data:image/jpeg;base64,${base64Image}`;

    const str=`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Event Report</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0 auto;
              height:auto;
              padding: 20px;
          }
          h1 {
              color: #2c3e50;
              text-align: center;
              font-size: 5rem;
          }
          .event-info {
              background-color: #f2f2f2;
              padding: 15px;
              border-radius: 5px;
              border: 1px solid #ccc;
          }
          p{
              font-size:2.5rem;
          }
          footer {
              text-align: center;
              font-size: 1.5rem;
              color: #666;
              margin-top: 20px;
              padding: 10px;
              border-top: 1px solid #ccc;
              width:100%;
              position:absolute;
              bottom: 0%;
              left: 0%;
              width: 100%;
          }
        img {
            max-width:100%;
            max-height:200vh;
        }

      </style>
  </head>
  <body>
      <h1>${eventTitle}</h1>
      <div class="event-info">
          <p><strong>Date:</strong>${eventDate}</p>
          <p><strong>Time:</strong>${eventTime}</p>
          <p><strong>Location:</strong> ${eventLocation}</p>
      </div>
      <img src="${imgSrc}" alt="Event Image">
  </body>
  </html>`
    return str
  }

exports.Template4=(eventTitle,eventDate,eventTime,eventLocation,images)=>{
    const base64Image = fs.readFileSync(`./uploads/${images[0]}` ,'base64');
    const imgSrc = `data:image/jpeg;base64,${base64Image}`;

    const str=`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Event Report</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0 auto;
              height:auto;
              padding: 20px;
          }
        h1 {
            color: #3498db;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            text-align: center;
            font-size: 5rem;
        }
        .container {
            display: flex;
        }
        .event-info {
            padding-right: 20px;
            display:flex;
            flex-direction:column;
        }
        .event-image {
        }
        img {
            max-width: 100%;
            height: auto;
        }
        p{
            font-size:2.5rem;
        }
        footer {
            text-align: center;
            font-size: 1.5rem;
            color: #666;
            margin-top: 20px;
            padding: 10px;
            border-top: 1px solid #ccc;
            width:100%;
            position:absolute;
            bottom: 0%;
            left: 0%;
            width: 100%;
        }

      </style>
  </head>
  <body>
      <h1>${eventTitle}</h1>
      <div class="container">
      <table style="width: 100%;">
        <tr>
            <td style="width: 50%;">
                <table style="width:100%;height:100%">
                    <tr style="height: 30%;"><td><p><strong>Date:</strong>${eventDate}</p></td></tr>
                    <tr style="height: 30%;"><td><p><strong>Time:</strong>${eventTime}</p></td></tr>
                    <tr style="height: 30%;"><td><p><strong>Location:</strong> ${eventLocation}</p></td></tr>
                </table>
           </td>
            <td style="width: 50%;"><img src="${imgSrc}" alt="Event Image"></td>
        </tr>
      </table>
  </body>
  </html>`
    return str
}

exports.Template5 = (eventTitle, eventDate, eventTime, eventLocation, images) => {
    const imageSources = images.map(image => {
        const base64Image = fs.readFileSync(`./uploads/${image}`, 'base64');
        return `data:image/jpeg;base64,${base64Image}`;
    });

    const str = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event Report</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0 auto;
                height: auto;
                padding: 20px;
            }
            h1 {
            color: #3498db;
            border-bottom: 2px solid #3498db;
            text-align: center;
            font-size: 5rem;
            }
            p {
                font-size: 2.5rem;
            }
            footer {
                text-align: center;
                font-size: 1.5rem;
                color: #666;
                margin-top: 20px;
                padding: 10px;
                border-top: 1px solid #ccc;
                width: 100%;
                position: absolute;
                bottom: 0%;
                left: 0%;
                width: 100%;
            }
            #imageTable {
        width: 100%;
        table-layout: fixed;
    }
    #imageTable td {
        width: 33.33%;
        height: 300px;
         overflow: hidden;
    }
    #imageTable img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
        </style>
    </head>
    <body>
        <h1>${eventTitle}</h1>
        <div class="event-info">
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Time:</strong> ${eventTime}</p>
            <p><strong>Location:</strong> ${eventLocation}</p>
        </div>
       <table id="imageTable">
            <tr>
                ${imageSources.slice(0, 3).map(src => `
                <td><img src="${src}" alt="Event Image"></td>`).join('')}
            </tr>
            <tr>
                ${imageSources.slice(3, 6).map(src => `
                <td><img src="${src}" alt="Event Image"></td>`).join('')}
            </tr>
        </table>
    </body>
    </html>`;

    return str;
};


exports.Template6=(eventTitle,eventDate,eventTime,eventLocation,images)=>{
    const imageSources = images.map(image => {
        const base64Image = fs.readFileSync(`./uploads/${image}`, 'base64');
        return `data:image/jpeg;base64,${base64Image}`;
    });

    const str = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event Report</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0 auto;
                height: auto;
                padding: 20px;
            }
            h1 {
                color: #2c3e50;
                text-align: center;
                font-size: 5rem;
            }
            .event-info {
                background-color: #f2f2f2;
                padding: 15px;
                border-radius: 5px;
                border: 1px solid #ccc;
            }
            p{
                font-size:2.5rem;
            }
            footer {
                text-align: center;
                font-size: 1.5rem;
                color: #666;
                margin-top: 20px;
                padding: 10px;
                border-top: 1px solid #ccc;
                width: 100%;
                position: absolute;
                bottom: 0%;
                left: 0%;
                width: 100%;
            }
            #imageTable {
                width: 100%;
                table-layout: fixed;
            }
            #imageTable td {
                width: 33.33%;
                height: 300px;
                overflow: hidden;
            }
            #imageTable img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        </style>
    </head>
    <body>
        <h1>${eventTitle}</h1>
        <div class="event-info">
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Time:</strong> ${eventTime}</p>
            <p><strong>Location:</strong> ${eventLocation}</p>
        </div>
        <table id="imageTable">
            <tr>
                ${imageSources.slice(0, 3).map(src => `
                <td><img src="${src}" alt="Event Image"></td>`).join('')}
            </tr>
            <tr>
                ${imageSources.slice(3, 6).map(src => `
                <td><img src="${src}" alt="Event Image"></td>`).join('')}
            </tr>
        </table>
    </body>
    </html>`;

    return str;
}