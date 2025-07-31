<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
    <style>
        /* Basic Reset & Body Styles */
        body {
            font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f7fa; /* Light background for the email */
            color: #333333;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            line-height: 1.6;
        }

        /* Container for content */
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            overflow: hidden; /* Ensures rounded corners are respected */
        }

        /* Header Styles */
        .header {
            background-color: #4f46e5; /* Indigo-600 */
            padding: 30px 25px;
            color: #ffffff;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .header h2 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            line-height: 1.2;
        }
        .header .icon {
            font-size: 36px;
            vertical-align: middle;
            margin-right: 10px;
        }

        /* Content Area */
        .content {
            padding: 25px;
        }
        .content p {
            margin-bottom: 15px;
            font-size: 16px;
            color: #4a4a4a;
        }
        .content strong {
            color: #333333;
        }

        /* Details List */
        .details-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
            border-left: 4px solid #6366f1; /* Indigo-500 */
            background-color: #f0f4ff; /* Light indigo */
            border-radius: 4px;
            padding: 15px 20px;
        }
        .details-list li {
            margin-bottom: 8px;
            font-size: 15px;
            color: #333333;
        }
        .details-list li:last-child {
            margin-bottom: 0;
        }
        .details-list strong {
            color: #1a1a1a;
        }

        /* Google Meet Link */
        .meet-section {
            background-color: #e0f2f7; /* Light blue */
            border-radius: 8px;
            padding: 20px;
            margin-top: 25px;
            text-align: center;
        }
        .meet-section h3 {
            color: #007bff; /* Blue */
            margin-top: 0;
            font-size: 20px;
            font-weight: 600;
        }
        .meet-link {
            display: inline-block; /* For padding and background */
            background-color: #28a745; /* Green for action */
            color: #ffffff;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            margin-top: 15px;
            transition: background-color 0.3s ease;
        }
        .meet-link:hover {
            background-color: #218838; /* Darker green on hover */
        }
        .small-note {
            font-size: 13px;
            color: #6a6a6a;
            margin-top: 15px;
            display: block; /* Ensure it takes its own line */
        }

        /* Separator */
        hr {
            border: none;
            border-top: 1px solid #eeeeee;
            margin: 30px 0;
        }

        /* Footer Styles */
        .footer {
            text-align: center;
            padding: 20px 25px;
            font-size: 14px;
            color: #777777;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }

        /* Responsive adjustments */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 0;
            }
            .content, .header, .footer {
                padding: 20px;
            }
            .header h2 {
                font-size: 24px;
            }
            .content p {
                font-size: 15px;
            }
            .details-list {
                padding: 10px 15px;
            }
            .meet-link {
                padding: 10px 20px;
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h2><span class="icon">📅</span> {{trans('common.mail')}}</h2>
        </div>

        <div class="content">
            <p>Dear {{ $type == 'guest'? $data['name'] : $data['host_name'] }},</p>

            <p>{{trans('common.mail1')}} <strong>{{ $type == 'guest'? 'host '.$data['host_name'] : $data['name'] }}</strong>.</p>

            <p><strong>{{trans('common.mail2')}}</strong></p>
            <ul class="details-list">
                <li><strong>{{trans('common.mail3')}}</strong> {{ $data['title'] }}</li>
                <li><strong>{{trans('common.mail4')}}</strong> {{ \Carbon\Carbon::parse($data['date'])->toFormattedDateString() }}</li>
                <li><strong>{{trans('common.mail5')}}</strong> {{ $data['booked_time'] }}</li>
            </ul>

            <div class="meet-section">
                <h3>🔗 {{trans('common.mail6')}}</h3>
                <p>
                    {{trans('common.mail7')}}
                    <br>
                    <!-- dummy link -->
                    <a href="https://meet.google.com/xyz-abc-def" class="meet-link">{{trans('common.mail8')}}</a>
                </p>
                <p class="small-note">{{trans('common.mail9')}}</p>
            </div>
        </div>

        <hr>

        <div class="footer">
            <p>{{trans('common.mail10')}}<br>{{trans('common.mail11')}}</p>
        </div>
    </div>
</body>
</html>
