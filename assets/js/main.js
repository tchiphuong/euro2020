$("document").ready(function () {
    //match
    $.ajax({
        // url: "https://match.uefa.com/v2/matches?&order=ASC&offset=0&limit=10&competitionId=3&fromDate=2012-06-11",
        url: "https://match.uefa.com/v2/matches?fromDate=2021-06-11&toDate=2021-07-11&order=ASC&offset=0&limit=100&competitionId=3",
        dataType: "json",
        type: "GET",
    }).done(function (response) {
        var date = "";
        var type = "";
        var score = "";
        for (let i = 0; i < Object.keys(response).length; i -= -1) {
            if (i > 0) {
                if (moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY") === moment(response[i - 1]["kickOffTime"]["dateTime"]).format("DDMMYYYY"))
                {
                    date = "";
                }
                else
                {
                    date = 
                    `
                        <div class="flex flex-col w-full p-2 md:w-6/12 lg:w-4/12 xl:w-3/12" data-aos="fade-up" data-aos-duration="2000">
                            <div class="w-full overflow-hidden bg-white shadow-md cursor-pointer rounded-xl" id="match` + moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY") + `">
                                <div class="p-3 font-bold uppercase">` + moment(response[i]["kickOffTime"]["dateTime"]).format("DD/MM/YYYY") + `</div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
            else
            {
                date = 
                    `
                        <div class="flex flex-col w-full p-2 md:w-6/12 lg:w-4/12 xl:w-3/12" data-aos="fade-up" data-aos-duration="2000">
                            <div class="w-full overflow-hidden bg-white shadow-md cursor-pointer rounded-xl" id="match` + moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY") + `">
                                <div class="p-3 font-bold uppercase">` + moment(response[i]["kickOffTime"]["dateTime"]).format("DD/MM/YYYY") + `</div>
                                </div>
                            </div>
                        </div>
                    `;
            }

            $("#matchData").append(date);
            if (response[i]["group"]) {
                type = `<div class="font-bold text-center">` + response[i]["group"]["metaData"]["groupName"] + `</div>`;
            } else {
                type = `<div class="font-bold text-center">` + response[i]["round"]["metaData"]["name"] + `</div>`;
            }
            if (response[i]["score"]) {
                score =  response[i]["score"]["regular"]["home"] + ` - `+ response[i]["score"]["regular"]["away"];
            } else {
                score = moment(response[i]["kickOffTime"]["dateTime"]).format("LT");
            }

            $("#match" + moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY")).append(
                `
                    <div x-data="{ lineup: false }" class="flex flex-col hover:opacity-80 hover:bg-gray-50 ` + response[i]["id"] + `">
                        <div class="py-2 border-t">` + type + `
                            <div @click="{ lineup = true }" class="flex items-center justify-center py-2">
                                <div class="w-4/12 px-2 text-right capitalize line-clamp-3">` + response[i]["homeTeam"]["internationalName"] + `</div>
                                <div>
                                    <img class="w-6 h-6" src="` + response[i]["homeTeam"]["logoUrl"] + `" alt="` + response[i]["homeTeam"]["internationalName"] + `">
                                </div>
                                <div class="w-3/12 text-center">` + score + `</div>
                                <div>
                                    <img class="w-6 h-6" src="` + response[i]["awayTeam"]["logoUrl"] + `" alt="` + response[i]["awayTeam"]["internationalName"] + `">
                                </div>
                                <div class="w-4/12 px-2 text-left capitalize line-clamp-3">` + response[i]["awayTeam"]["internationalName"] + `</div>
                            </div>
                        </div>    
                    </div>
                    `
            );
            if (response[i]["score"]) {
                lineup(response[i]["id"]);
            }
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
                `
                    <div data-aos="fade-up" data-aos-duration="2000" class="w-full px-2 md:w-6/12 lg:w-4/12">
                        <div class="flex flex-col w-full p-3 my-2 bg-white shadow-md cursor-pointer rounded-xl">
                            <div class="font-bold uppercase">` + response[i]["group"]["metaData"]["groupName"] + `</div>
                            <table id="group` + response[i]["group"]["id"] + `">
                                <thead>
                                    <th class="w-1/12 py-2"></th>
                                    <th class="w-8 py-2"></th>
                                    <th class="flex-grow py-2"></th>
                                    <th class="w-1/12 py-2">P</th>
                                    <th class="w-1/12 py-2">W</th>
                                    <th class="w-1/12 py-2">D</th>
                                    <th class="w-1/12 py-2">L</th>
                                    <th class="w-1/12 py-2">+/-</th>
                                    <th class="w-1/12 py-2">Pts</th>
                                </thead>
                            </table>
                        </div>
                    </div>
                `
            );
            for (let j = 0; j < Object.keys(response[i]["items"]).length; j -= -1)
            {
                $("#group" + response[i]["group"]["id"]).append(
                    `
                    <tr class="bg-white border-t hover:opacity-80">
                        <td class="p-1">` + response[i]["items"][j]["rank"] + `</td>
                        <td class="py-2"><img class="w-6 h-6" src="` + response[i]["items"][j]["team"]["bigLogoUrl"] + `" alt="` + response[i]["items"][j]["team"]["internationalName"] + `"></td>
                        <td class="py-1 my-1 capitalize line-clamp-1">` + response[i]["items"][j]["team"]["internationalName"] + `</td>
                        <td class="py-2 text-center">` + response[i]["items"][j]["played"] + `</td>
                        <td class="py-2 text-center">` + response[i]["items"][j]["won"] + `</td>
                        <td class="py-2 text-center">` + response[i]["items"][j]["drawn"] + `</td>
                        <td class="py-2 text-center">` + response[i]["items"][j]["lost"] + `</td>
                        <td class="py-2 text-center">` + response[i]["items"][j]["played"] + `</td>
                        <td class="py-2 text-center">` + response[i]["items"][j]["goalDifference"] + `</td>
                    </tr>`
                );
            }
        }
    });

    //team
    function team(id, name, logo)
        {
            $("#teamData").append(
                        `
                        <div x-data="{ list: false}" class="relative w-full p-2 md:w-4/12 lg:w-3/12">
                            <div data-aos="fade-up" data-aos-duration="1000" @click="list = true" class="flex py-3 bg-white shadow-md rounded-xl hover:opacity-80">
                                <div class="flex items-center justify-center h-24 w-28">
                                    <img class="w-20 h-20" src="` + logo + `" alt="` + name + `">
                                </div>
                                <div class="flex flex-col">
                                    <div class="px-2 font-bold line-clamp-1">` + name + `</div>
                                    <ul class="flex flex-wrap flex-grow m-1" id="team` + id + `">
                                        <li class="flex items-center justify-center m-1 text-xs text-white bg-green-500 rounded-full h-7 w-7">W</li>
                                        <li class="flex items-center justify-center m-1 text-xs text-white bg-green-500 rounded-full h-7 w-7">W</li>
                                        <li class="flex items-center justify-center m-1 text-xs text-white bg-green-500 rounded-full h-7 w-7">W</li>
                                        <li class="flex items-center justify-center m-1 text-xs text-white bg-green-500 rounded-full h-7 w-7">W</li>
                                        <li class="flex items-center justify-center m-1 text-xs text-white bg-green-500 rounded-full h-7 w-7">W</li>
                                    </ul>
                                </div>
                            </div>
                            <div x-show.in.transition.200ms="list" @click.away="list = false" class="absolute z-20 overflow-hidden bg-white shadow-xl top-28 rounded-xl inset-x-2">
                                <ul class="overflow-y-scroll m max-h-72 scrollbar-hide" id="team` + id + `">
                                    
                                </ul>
                            </div>
                        </div>
                        `
                    );
        }


        $.ajax({
        url: 'https://comp.uefa.com/v2/teams?competitionId=3&limit=24&offset=0',
        dataType: 'json',
        type: 'GET',
        }).done(function(response) {
            var sortedData = [];
            $("#teamData").empty();
            for (let i = 0; i < Object.keys(response).length; i -= -1)
            {
                sortedData.push(response[i]);
            }
            sortedData.sort(function(a, b) {
                return a.internationalName.localeCompare(b.internationalName)
            });

            // console.log(sortedData);
            for(let i = 0; i < sortedData.length; i -= -1)
            {
                team(sortedData[i]["id"],sortedData[i]["internationalName"],sortedData[i]["mediumLogoUrl"],i);
            }
        });


        // lineup
        function lineup(matchId)
        {
            $("." + matchId).append(
                `
                    <div x-show.transition.origin.left.top.in.duration.200ms.out.duration.50ms="lineup" @click.away="lineup = false" class="inset-x-0 flex flex-col px-2 top-20 rounded-xl">    
                        <div class="pt-3 pb-2 font-bold text-center capitalize" id="lineup">Lineup</div>
                        <div class="flex justify-between bg-white">
                            <ul id="lineUpHomeTeam` + matchId + `" class="flex flex-col items-start w-full">
                            </ul>
                            <ul id="lineUpAwayTeam` + matchId + `" class="flex flex-col items-end w-full bg-white">
                            </ul>
                        </div>
                        <div class="pt-3 pb-2 font-bold text-center capitalize" id="substitute">substitute</div>
                        <div class="flex justify-between bg-white">
                            <ul id="subHomeTeam` + matchId + `" class="flex flex-col items-start w-full">
                            </ul>
                            <ul id="subAwayTeam` + matchId + `" class="flex flex-col items-end w-full bg-white">
                            </ul>
                        </div>
                    </div>
                `
            );


        $.ajax({
            url: 'https://match.uefa.com/v3/matches/'+ matchId +'/lineups',
            dataType: 'json',
            type: 'GET',
            }).done(function(response) {
                for (let i = 0; i < Object.keys(response["homeTeam"]["field"]).length; i -= -1)
                {
                    $("#lineUpHomeTeam" + response["matchId"]).append(
                        `
                        <li class="flex items-center justify-start w-full p-1 border-t hover:bg-gray-50">
                            <span class="w-2/12 p-1 text-center">` + response["homeTeam"]["field"][i]["jerseyNumber"] + `</span>
                            <img class="w-8 h-8 mr-1 bg-gray-100 rounded-full" src="` + response["homeTeam"]["field"][i]["player"]["imageUrl"] + `" alt="` + response["homeTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + `">
                            <span class="p-1 line-clamp-1">` + response["homeTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + `</span>
                        </li>
                        `
                    );
                }

                for (let i = 0; i < Object.keys(response["homeTeam"]["bench"]).length; i -= -1)
                {
                    $("#subHomeTeam" + response["matchId"]).append(
                        `
                        <li class="flex items-center justify-start w-full p-1 border-t hover:bg-gray-50">
                            <span class="w-2/12 p-1 text-center">` + response["homeTeam"]["bench"][i]["jerseyNumber"] + `</span>
                            <img class="w-8 h-8 mr-1 bg-gray-100 rounded-full" src="` + response["homeTeam"]["bench"][i]["player"]["imageUrl"] + `" alt="` + response["homeTeam"]["bench"][i]["player"]["translations"]["shortName"]["EN"] + `">
                            <span class="p-1 line-clamp-1">` + response["homeTeam"]["bench"][i]["player"]["translations"]["shortName"]["EN"] + `</span>
                        </li>
                        `
                    );
                }
                
                for (let i = 0; i < Object.keys(response["awayTeam"]["field"]).length; i -= -1)
                {
                    $("#lineUpAwayTeam" + response["matchId"]).append(
                        `
                        <li class="flex items-center justify-end w-full p-1 border-t hover:bg-gray-50">
                            <span class="p-1 text-right line-clamp-1">` + response["awayTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + `</span>
                            <img class="w-8 h-8 mr-1 bg-gray-100 rounded-full" src="` + response["awayTeam"]["field"][i]["player"]["imageUrl"] + `" alt="` + response["awayTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + `">
                            <span class="w-2/12 p-1 text-center">` + response["awayTeam"]["field"][i]["jerseyNumber"] + `</span>
                        </li>
                        `
                    );
                }
                
                for (let i = 0; i < Object.keys(response["awayTeam"]["bench"]).length; i -= -1)
                {
                    $("#subAwayTeam" + response["matchId"]).append(
                        `
                        <li class="flex items-center justify-end w-full p-1 border-t hover:bg-gray-50">
                            <span class="p-1 text-right line-clamp-1">` + response["awayTeam"]["bench"][i]["player"]["translations"]["shortName"]["EN"] + `</span>
                            <img class="w-8 h-8 mr-1 bg-gray-100 rounded-full" src="` + response["awayTeam"]["bench"][i]["player"]["imageUrl"] + `" alt="` + response["awayTeam"]["bench"][i]["player"]["translations"]["shortName"]["EN"] + `">
                            <span class="w-2/12 p-1 text-center">` + response["awayTeam"]["bench"][i]["jerseyNumber"] + `</span>
                        </li>
                        `
                    );
                }
                

            });
            
        }
});
