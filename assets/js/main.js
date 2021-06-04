$("document").ready(function () {
    //match
    $.ajax({
        url: "https://match.uefa.com/v2/matches?fromDate=2021-06-11&toDate=2021-07-11&order=ASC&offset=0&limit=100&competitionId=3",
        dataType: "json",
        type: "GET",
    }).done(function (response) {
        var date = "";
        var type = "";
        for (let i = 0; i < Object.keys(response).length; i -= -1) {
            if (i > 0) {
                if (
                    moment(response[i]["kickOffTime"]["dateTime"]).format(
                        "DDMMYYYY"
                    ) ===
                    moment(response[i - 1]["kickOffTime"]["dateTime"]).format(
                        "DDMMYYYY"
                    )
                ) {
                    date = "";
                } else {
                    date =
                        `<div class="flex flex-col w-full p-2 md:w-6/12 lg:w-4/12 xl:w-3/12">
                                    <div class="w-full overflow-hidden bg-white shadow-md cursor-pointer rounded-xl">
                                        <div class="p-3 font-bold uppercase">` +
                        moment(response[i]["kickOffTime"]["dateTime"]).format(
                            "DD/MM/YYYY"
                        ) +
                        `</div>
                                        <div class="flex flex-col hover:opacity-80 hover:bg-gray-50" id="match` +
                        moment(response[i]["kickOffTime"]["dateTime"]).format(
                            "DDMMYYYY"
                        ) +
                        `">
                                        
                                        </div>
                                        </div>
                                    </div>
                                </div>`;
                }
            } else {
                date =
                    `<div class="flex flex-col w-full p-2 md:w-6/12 lg:w-4/12 xl:w-3/12">
                                    <div class="w-full overflow-hidden bg-white shadow-md cursor-pointer rounded-xl">
                                        <div class="p-3 font-bold uppercase">` +
                    moment(response[i]["kickOffTime"]["dateTime"]).format(
                        "DD/MM/YYYY"
                    ) +
                    `</div>
                                        <div class="flex flex-col hover:opacity-80 hover:bg-gray-50" id="match` +
                    moment(response[i]["kickOffTime"]["dateTime"]).format(
                        "DDMMYYYY"
                    ) +
                    `">
                                        
                                        </div>
                                        </div>
                                    </div>
                                </div>`;
            }

            $("#matchData").append(date);
            if (response[i]["group"]) {
                type =
                    `<div class="font-bold text-center">` +
                    response[i]["group"]["metaData"]["groupName"] +
                    `</div>`;
            } else {
                type =
                    `<div class="font-bold text-center">` +
                    response[i]["round"]["metaData"]["name"] +
                    `</div>`;
            }
            $(
                "#match" +
                    moment(response[i]["kickOffTime"]["dateTime"]).format(
                        "DDMMYYYY"
                    )
            ).append(
                `
                        <div class="py-2 border-t">
                            ` +
                    type +
                    `
                            <div class="flex items-center justify-center py-2">
                                <div class="w-4/12 px-2 text-right capitalize line-clamp-2">` +
                    response[i]["homeTeam"]["internationalName"] +
                    `</div>
                                <div><img class="w-6 h-6" src="` +
                    response[i]["homeTeam"]["logoUrl"] +
                    `" alt="` +
                    response[i]["homeTeam"]["internationalName"] +
                    `"></div>
                                <div class="w-3/12 text-center">` +
                    moment(response[i]["kickOffTime"]["dateTime"]).format(
                        "LT"
                    ) +
                    `</div>
                                <div><img class="w-6 h-6" src="` +
                    response[i]["awayTeam"]["logoUrl"] +
                    `" alt="` +
                    response[i]["awayTeam"]["internationalName"] +
                    `"></div>
                                <div class="w-4/12 px-2 text-left capitalize line-clamp-2">` +
                    response[i]["awayTeam"]["internationalName"] +
                    `</div>
                            </div>
                        </div>
                    `
            );
        }
    });
    //group
    $.ajax({
        url: "https://standings.uefa.com/v1/standings?groupIds=2006438,2006439,2006440,2006441,2006442,2006443",
        dataType: "json",
        type: "GET",
    }).done(function (response) {
        for (let i = 0; i < Object.keys(response).length; i -= -1) {
            $("#groupData").append(
                `<div class="w-full px-2 md:w-6/12 lg:w-4/12"><div class="flex flex-col w-full p-3 my-2 bg-white shadow-md cursor-pointer rounded-xl"><div class="font-bold uppercase">` +
                    response[i]["group"]["metaData"]["groupName"] +
                    `</div><table id="group` +
                    response[i]["group"]["id"] +
                    `"><thead><th class="w-1/12 py-2"></th><th class="w-8 py-2"></th><th class="flex-grow py-2"></th><th class="w-1/12 py-2">P</th><th class="w-1/12 py-2">W</th><th class="w-1/12 py-2">D</th><th class="w-1/12 py-2">L</th><th class="w-1/12 py-2">+/-</th><th class="w-1/12 py-2">Pts</th></thead></table></div></div>`
            );
            for (
                let j = 0;
                j < Object.keys(response[i]["items"]).length;
                j -= -1
            ) {
                $("#group" + response[i]["group"]["id"]).append(
                    `<tr class="bg-white border-t hover:opacity-80"><td class="p-1">` +
                        response[i]["items"][j]["rank"] +
                        `</td><td class="py-2"><img class="w-6 h-6" src="` +
                        response[i]["items"][j]["team"]["bigLogoUrl"] +
                        `" alt="` +
                        response[i]["items"][j]["team"]["internationalName"] +
                        `"></td><td class="py-1 my-1 capitalize line-clamp-1">` +
                        response[i]["items"][j]["team"]["internationalName"] +
                        `</td><td class="py-2 text-center">` +
                        response[i]["items"][j]["played"] +
                        `</td><td class="py-2 text-center">` +
                        response[i]["items"][j]["won"] +
                        `</td><td class="py-2 text-center">` +
                        response[i]["items"][j]["drawn"] +
                        `</td><td class="py-2 text-center">` +
                        response[i]["items"][j]["lost"] +
                        `</td><td class="py-2 text-center">` +
                        response[i]["items"][j]["played"] +
                        `</td><td class="py-2 text-center">` +
                        response[i]["items"][j]["goalDifference"] +
                        `</td></tr>`
                );
            }
        }
    });
});
