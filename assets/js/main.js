$(document).ready(function() {
    setInterval(function () {
        var times = moment().format("dddd, DD/MM/YYYY, hh:mm:ss");
        $("#timenow").html(times)
        $.ajax({
            // url: "https://match.uefa.com/v2/matches?&order=ASC&offset=0&limit=20&competitionId=3&fromDate=2016-06-11&toDate=2021-05-29",
            url: "https://match.uefa.com/v2/matches?fromDate=2021-06-11&toDate=2021-07-11&order=ASC&offset=0&limit=100&competitionId=3",
            dataType: "json",
            type: "GET",
        }).done(function (response) {
            for (let i = 0; i < Object.keys(response).length; i -= -1) {
                if(response[i]["status"] == "LIVE")
                {
                    if(response[i]["minute"])
                    {
                        if(response[i]["minute"]["injury"])
                        {
                            $(".m" + response[i]["id"]).html(
                                response[i]["minute"]["normal"]+"+" +response[i]["minute"]["injury"] + "'"
                            );
                        }
                        else
                        {
                            $(".m" + response[i]["id"]).html(
                                response[i]["minute"]["normal"]+"'"
                            );
                        }
                    }
                    if (response[i]["score"]) {
                        if(response[i]["score"]["penalty"])
                        {
                            $(".s" + response[i]["id"]).html(score =  response[i]["score"]["total"]["home"] + ` - `+ response[i]["score"]["total"]["away"] + `<div class="text-xs flex flex-col font-normal"><div>Penalty</div><div class="text-xs px-1 font-normal">` + response[i]["score"]["penalty"]["home"] + ` - ` + response[i]["score"]["penalty"]["away"] + `</div></div>`);
                        }
                        else
                        {
                            $(".s" + response[i]["id"]).html(score =  response[i]["score"]["total"]["home"] + ` - `+ response[i]["score"]["total"]["away"]);
                        }
                        // insertScore(response[i]["id"], response[i]["score"]["regular"]["away"], response[i]["score"]["regular"]["home"], response[i]["awayTeam"]["internationalName"], response[i]["homeTeam"]["internationalName"]);
                    } else {
                        score = `<span>` +  + `</span>`;
                        $(".s" + response[i]["id"]).html(
                            `<span class="text-base font-normal">` + moment(response[i]["kickOffTime"]["dateTime"]).format("LT") + `</span>`
                        );
                    }
                    getScore(response[i]["id"]);
                    
                    if(response[i]["phase"] == "HAFT_TIME_BREAK")
                    {
                        $(".m" + response[i]["id"]).html(
                            `<span class="text-xs">Haft-time break</span>`
                        );
                    }
                    else if(response[i]["phase"] == "END_SECOND_HALF")
                    {
                        $(".m" + response[i]["id"]).html(
                            `<span class="text-xs">End of 2nd half</span>`
                        );
                    }
                    else if(response[i]["phase"] == "EXTRA_TIME_BREAK")
                    {
                        $(".m" + response[i]["id"]).html(
                            `<span class="text-xs">ET half-time</span>`
                        );
                    }
                }
                else
                {
                    $(".m" + response[i]["id"]).empty();
                }
            }
        })
    }, 1000);


    //match
    $.ajax({
        // url: "https://match.uefa.com/v2/matches?&order=ASC&offset=0&limit=100&competitionId=3&fromDate=2012-06-08&toDate=2012-07-01",
        url: "https://match.uefa.com/v2/matches?fromDate=2021-06-11&toDate=2021-07-11&order=ASC&offset=0&limit=100&competitionId=3",
        dataType: "json",
        type: "GET",
    }).done(function (response) {
        var date = "";
        var type = "";
        var score = "";
        var minute = "";
        for (let i = 0; i < Object.keys(response).length; i -= -1) {
            if (i > 0) {
                if (moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY") === moment(response[i - 1]["kickOffTime"]["dateTime"]).format("DDMMYYYY"))
                {
                    date = "";
                }
                else
                if(moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY") === moment().format("DDMMYYYY"))
                {
                    date = 
                    `
                        <div class="flex flex-col w-full p-2 md:w-6/12 lg:w-4/12" data-aos="fade-up" data-aos-duration="2000">
                            <div class="w-full overflow-hidden bg-white shadow-md cursor-pointer rounded-xl" id="match` + moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY") + `">
                                <div class="p-3 font-bold capitalize">Today</div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                else
                {
                    date = 
                    `
                        <div class="flex flex-col w-full p-2 md:w-6/12 lg:w-4/12" data-aos="fade-up" data-aos-duration="2000">
                            <div class="w-full overflow-hidden bg-white shadow-md cursor-pointer rounded-xl" id="match` + moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY") + `">
                                <div class="p-3 font-bold capitalize">` + moment(response[i]["kickOffTime"]["dateTime"]).format("DD/MM/YYYY") + `</div>
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
                        <div class="flex flex-col w-full p-2 md:w-6/12 lg:w-4/12" data-aos="fade-up" data-aos-duration="2000">
                            <div class="w-full overflow-hidden bg-white shadow-md cursor-pointer rounded-xl" id="match` + moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY") + `">
                                <div class="p-3 font-bold capitalize">` + moment(response[i]["kickOffTime"]["dateTime"]).format("DD/MM/YYYY") + `</div>
                                </div>
                            </div>
                        </div>
                    `;
            }

            $("#matchData").append(date);
            if(response[i]["minute"])
            {
                minute = response[i]["minute"]["normal"]+"'";
            }
            else{
                minute = "";
            }
            if (response[i]["group"]) {
                type = `<div class="font-bold text-center">` + response[i]["group"]["metaData"]["groupName"] + `</div>`;
            } else {
                type = `<div class="font-bold text-center">` + response[i]["round"]["metaData"]["name"] + `</div>`;
            }
            if (response[i]["score"]) {
                if(response[i]["score"]["penalty"])
                {
                    // score =  response[i]["score"]["total"]["home"] + `<sub class="px-1">(` + response[i]["score"]["penalty"]["home"] + `)</sub> - <sub class="px-1">(` + response[i]["score"]["penalty"]["away"] + `)</sub>` + response[i]["score"]["total"]["away"];
                    score =  response[i]["score"]["total"]["home"] + ` - `+ response[i]["score"]["total"]["away"] + `<div class="text-xs flex flex-col font-normal"><div>Penalty</div><div class="text-xs px-1 font-normal">` + response[i]["score"]["penalty"]["home"] + ` - ` + response[i]["score"]["penalty"]["away"] + `</div></div>`;

                }
                else
                {
                    score =  response[i]["score"]["total"]["home"] + ` - `+ response[i]["score"]["total"]["away"];
                }
            } else {
                score = `<span class="text-base font-normal">` + moment(response[i]["kickOffTime"]["dateTime"]).format("LT") + `</span>`;
            }
    
            $("#match" + moment(response[i]["kickOffTime"]["dateTime"]).format("DDMMYYYY")).append(
                `
                    <div onclick="lineup(\'` + response[i]["id"] + `\',\'` + response[i]["lineupStatus"] + `\');" x-data="{ event: false }" class="flex flex-col hover:opacity-80 hover:bg-gray-50 ` + response[i]["id"] + `">
                        <div class="py-2 border-t">` + type + `
                            <div @click="{ event = true }" class="flex items-center justify-center py-2">
                                <div class="w-4/12 px-2 text-right capitalize line-clamp-3">` + response[i]["homeTeam"]["internationalName"] + `</div>
                                <div>
                                    <img class="w-6 h-6" src="` + response[i]["homeTeam"]["logoUrl"] + `" alt="` + response[i]["homeTeam"]["internationalName"] + `">
                                </div>
                                <div class="flex flex-col w-3/12 text-center"><span class="font-bold text-lg s` + response[i]["id"] + `">` + score + `</span><span class="m` + response[i]["id"] + `">` + minute + `</span></div>
                                <div>
                                    <img class="w-6 h-6" src="` + response[i]["awayTeam"]["logoUrl"] + `" alt="` + response[i]["awayTeam"]["internationalName"] + `">
                                </div>
                                <div class="w-4/12 px-2 text-left capitalize line-clamp-3">` + response[i]["awayTeam"]["internationalName"] + `</div>
                            </div>
                        </div>
                        <div class="lineup` + response[i]["id"] + `"></div>
                    </div>
                    `
            );
                // lineup(response[i]["id"]);
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
                    <div data-aos="fade-up" data-aos-duration="2000" class="w-full px-2 md:w-6/12 xl:w-4/12">
                        <div class="flex flex-col w-full p-3 my-2 bg-white shadow-md cursor-pointer rounded-xl">
                            <div id="title" class="uppercase text-xl px-3">` + response[i]["group"]["metaData"]["groupName"] + `</div>
                            <table>
                                <thead>
                                    <tr class="text-sm bg-white">
                                        <th colspan="3"></th>
                                        <th class="w-1/12 my-2 text-center">P</th>
                                        <th class="w-1/12 my-2 text-center">W</th>
                                        <th class="w-1/12 my-2 text-center">D</th>
                                        <th class="w-1/12 my-2 text-center">L</th>
                                        <th class="w-1/12 my-2 text-center">+/-</th>
                                        <th class="w-1/12 my-2 text-center">Pts</th>
                                    </tr>
                                </thead>
                                <tbody id="group` + response[i]["group"]["id"] + `">

                                </tbody>
                            </table>
                        </div>
                    </div>
                `
            );
            for (let j = 0; j < Object.keys(response[i]["items"]).length; j -= -1)
            {
                $("#group" + response[i]["group"]["id"]).append(
                    `
                    <tr class="text-sm bg-white border-t md:text-base hover:opacity-80">
                        <td class="w-1/12 px-1 my-2 text-center">` + response[i]["items"][j]["rank"] + `</td>
                        <td class="w-6"><img class="w-full" src="` + response[i]["items"][j]["team"]["bigLogoUrl"] + `" alt="` + response[i]["items"][j]["team"]["internationalName"] + `"></td>
                        <td class="w-full p-1 my-2 capitalize line-clamp-1">` + response[i]["items"][j]["team"]["internationalName"] + `</td>
                        <td class="w-1/12 my-2 text-center">` + response[i]["items"][j]["played"] + `</td>
                        <td class="w-1/12 my-2 text-center">` + response[i]["items"][j]["won"] + `</td>
                        <td class="w-1/12 my-2 text-center">` + response[i]["items"][j]["drawn"] + `</td>
                        <td class="w-1/12 my-2 text-center">` + response[i]["items"][j]["lost"] + `</td>
                        <td class="w-1/12 my-2 text-center">` + response[i]["items"][j]["goalDifference"] + `</td>
                        <td class="w-1/12 my-2 text-center">` + response[i]["items"][j]["points"] + `</td>
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
                        <div x-data="{ list: false}" class="relative w-full p-2 md:w-6/12 xl:w-4/12 2xl:w-3/12">
                            <div data-aos="fade-up" data-aos-duration="1000" @click="list = true" class="flex py-3 bg-white shadow-md rounded-xl hover:opacity-80">
                                <div class="flex items-center justify-center h-24 w-28">
                                    <img class="w-20 h-20" src="` + logo + `" alt="` + name + `">
                                </div>
                                <div class="flex flex-col">
                                    <div id="title" class="px-2 text-lg truncate">` + name + `</div>
                                    <ul class="flex flex-wrap flex-grow m-1" id="team` + id + `">
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
                    numberOfMatches(5,id);
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


        

        //numberOfMatches
        function numberOfMatches(limit,teamIds)
        {
            $('#team' + teamIds).empty();
            $.ajax({
                url: 'https://data-card.uefa.com/v1/form-guide?numberOfMatches=' + limit + '&teamIds=' + teamIds,
                dataType: 'json',
                type: 'GET',
            }).done(function(response) {
                for (let i = 5; i > 0 ; i--)
                {
                    switch (response["data"][0]["formguide"][i-1]["outcome"]) {
                        case 'WIN':
                            $('#team' + response["data"][0]["team"]["id"]).append(
                                `
                                    <li class="flex items-center justify-center w-8 h-8 m-1 text-xs text-white bg-green-500 rounded-full lg:h-9 lg:w-9">` + response["data"][0]["formguide"][i-1]["outcome"].substring(0, 1) + `</li>
                                `
                            );
                          break;
                        case 'DRAW':
                            $('#team' + response["data"][0]["team"]["id"]).append(
                                `
                                    <li class="flex items-center justify-center w-8 h-8 m-1 text-xs text-white bg-gray-500 rounded-full lg:h-9 lg:w-9">` + response["data"][0]["formguide"][i-1]["outcome"].substring(0, 1) + `</li>
                                `
                            );
                          break;
                        default:
                            $('#team' + response["data"][0]["team"]["id"]).append(
                                `
                                    <li class="flex items-center justify-center w-8 h-8 m-1 text-xs text-white bg-red-500 rounded-full lg:h-9 lg:w-9">` + response["data"][0]["formguide"][i-1]["outcome"].substring(0, 1) + `</li>
                                `
                            );
                      }
                    
                }
            });
            
        }
});

function captain(res)
{
    var playerType = "";
    if(res == "CAPTAIN" || res == "GOALKEEPER_CAPTAIN")
    {
        playerType  = `
        <span class="absolute bottom-0 right-0 transform translate-y-0.5 translate-x-0.5 flex items-center justify-center w-3 h-3 text-xs text-white rounded-full bg-yellow-500">c</span>`;
    }
    else
    {
        playerType = "";
    }
    
    return playerType;
    
}

function playerType(res)
{
    var playerType = "";
    if(res == "GOALKEEPER" || res == "GOALKEEPER_CAPTAIN")
    {
        playerType  = `<span class="px-1">(GK)</span>`;
    }
    else
    {
        playerType = "";
    }
    
    return playerType;
    
}

function toolTip(tag)
{
    tippy(tag, {
        content:(reference)=>reference.getAttribute('data-title'),
            onMount(instance) {
            instance.popperInstance.setOptions({
                placement :instance.reference.getAttribute('data-placement')
            });
        },
        allowHTML: true,
        });
}


var lineUpArr = [];


// lineup
function lineup(matchId, lineupStatus)
{
    getTimeLine(matchId);
    loadLineUp = false;
    element = {};
    element.matchId = matchId;
    for(let i = 0; i < Object.keys(lineUpArr).length; i -= -1)
    {
        if(matchId == lineUpArr[i]["matchId"])
        {
            loadLineUp = true;
        }
        else
        {
            // return;
        }
    }

    if(loadLineUp == false)
    {
        if(lineupStatus == "TACTICAL_AVAILABLE" )
        {
            console.log("Loading...");
            lineUpArr.push(element);
            $.ajax({
                url: 'https://match.uefa.com/v3/matches/'+ matchId +'/lineups',
                dataType: 'json',
                type: 'GET',
            }).done(function(response) {
                if(response["lineupStatus"] == "NOT_AVAILABLE")
                {
                }
                else
                {
                    $("#load").append(
                        `
                        <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
                            <svg width="51px" heigth="50px" viewBox="0 0 51 50">
                                <rect y="0" width="13" height="50" fill="#1fa2ff">
                                <animate attributeName="height" values="50;10;50;" begin="0s" dur="1s" repeatCount="indefinite" />
                                <animate attributeName="y" values="0;20;0;" begin="0s" dur="1s" repeatCount="indefinite" />
                                </rect>
                                <rect x="19" y="0" width="13" height="50" fill="#12d8fa">
                                <animate attributeName="height" values="50;10;50;" begin="0.2s" dur="1s" repeatCount="indefinite" />
                                <animate attributeName="y" values="0;20;0;" begin="0.2s" dur="1s" repeatCount="indefinite" />
                                </rect>
                                <rect x="38" y="0" width="13" height="50" fill="#06ffcb">
                                <animate attributeName="height" values="50;10;50;" begin="0.4s" dur="1s" repeatCount="indefinite" />
                                <animate attributeName="y" values="0;20;0;" begin="0.4s" dur="1s" repeatCount="indefinite" />
                                </rect>
                            </svg>
                        </div>
                        `
                    )
                    $(".lineup" + matchId).empty();
                    setTimeout(() => { 
                    $(".lineup" + matchId).append(
                    `
                <div x-show.transition.origin.left.top.in.duration.200ms.out.duration.50ms="event" @click.away="event = false">
                <div class="flex flex-col text-sm event` + matchId + `">
                </div>
                    <div x-data="{ tab: 'lineup' }">
                        <ul class="flex justify-around my-2 border-t border-b shadow">
                            <li :class="{ 'active': tab === 'lineup' }" @click="tab = 'lineup'" class="w-full py-2 font-bold text-center hover:bg-gray-50">Lineup</li>
                            <li :class="{ 'active': tab === 'timeline' }" @click="tab = 'timeline'" class="w-full py-2 font-bold text-center hover:bg-gray-50">Timeline</li>
                        </ul>
                        <div x-show.transition.origin.right="tab === 'timeline'">
                            <ul class="flex flex-col px-3 pt-1 overflow-y-scroll max-h-64 scrollbar-hide timeline` + matchId + `">
                            </ul>
                        </div>
                        <div x-show.transition.origin.right="tab === 'lineup'">
                            <div class="inset-x-0 flex flex-col px-2 top-20 rounded-xl">
                                <div class="justify-between mb-2 text-white bg-white aspect-w-2 aspect-h-3" style="background: url('assets/images/bg.jpg'); background-size: cover; background-position: center;">
                                    <div class="absolute w-4/12 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-300 rounded-full left-1/2 top-1/2" style="height: calc(100% / 12 * 4 * 2 / 3 )"></div>
                                    <div class="absolute w-2 h-2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full left-1/2 top-1/2"></div>
                                    <div class="absolute w-1/5 transform -translate-x-1/2 border-2 border-gray-300 rounded-full translate-y-1/4 h-1/6 left-1/2" style="top: calc(2.5rem);"></div>
                                    <div class="absolute w-7/12 transform -translate-x-1/2 border-2 border-t-0 border-gray-300 backdrop-filter backdrop-blur-lg h-1/6 left-1/2" style="top: 2.5rem;">
                                        <div class="absolute top-0 w-7/12 transform -translate-x-1/2 border-2 border-t-0 border-gray-300 left-1/2 h-1/2"></div>
                                        <div class="absolute w-1 h-1 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full left-1/2 top-3/4"></div>
                                    </div>
                                    <div class="absolute w-1/5 transform -translate-x-1/2 border-2 border-gray-300 rounded-full -translate-y-1/4 h-1/6 left-1/2" style="top: calc(100% - 16.6667% - 2.5rem);"></div>
                                    <div class="absolute w-7/12 transform -translate-x-1/2 border-2 border-b-0 border-gray-300 backdrop-filter backdrop-blur-lg h-1/6 left-1/2" style="top: calc(100% - 16.6667% - 2.5rem);">
                                        <div class="absolute bottom-0 w-7/12 transform -translate-x-1/2 border-2 border-b-0 border-gray-300 left-1/2 h-1/2"></div>
                                        <div class="absolute w-1 h-1 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-full left-1/2 top-1/4"></div>
                                    </div>
                                    <div class="overflow-hidden">
                                    <div class="flex items-center h-10 px-2 py-1 border-2 border-b border-gray-300 bg-cyanEU">
                                    <img class="h-full filter drop-shadow" src="` + response["homeTeam"]["team"]["bigLogoUrl"] + `" alt="` + response["homeTeam"]["team"]["internationalName"] + `">
                                        <div class="flex flex-col h-full px-3">
                                        <span class="text-xs h-1/2">` + response["homeTeam"]["team"]["internationalName"] + `</span>
                                        <span class="text-xs h-1/2">Coach: ` + response["homeTeam"]["coaches"][0]["person"]["translations"]["name"]["EN"] + `</span>
                                        </div>
                                    </div>
                                    <ul id="lineUpHomeTeam` + matchId + `" class="relative w-full border-2 border-t border-b border-gray-300" style="height: calc(50% - 2.5rem);">
                                        
                                    </ul>
                                    <ul id="lineUpAwayTeam` + matchId + `" class="relative w-full transform rotate-180 border-2 border-t border-b border-gray-300" style="height: calc(50% - 2.5rem);">
                                        
                                    </ul>
                                    <div class="flex flex-row-reverse items-center h-10 px-2 py-1 mb-1 border-2 border-t border-gray-300 bg-cyanEU">
                                        <img class="h-full filter drop-shadow" src="` + response["awayTeam"]["team"]["bigLogoUrl"] + `" alt="` + response["awayTeam"]["team"]["internationalName"] + `">
                                        <div class="flex flex-col justify-end h-full px-3">
                                            <span class="text-xs text-right h-1/2">` + response["awayTeam"]["team"]["internationalName"] + `</span>
                                            <span class="text-xs h-1/2">Coach: ` + response["awayTeam"]["coaches"][0]["person"]["translations"]["name"]["EN"] + `</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pt-3 pb-2 font-bold text-center capitalize" id="substitute">substitute</div>
                            <div class="flex justify-between overflow-hidden bg-white rounded-lg opacity-100 hover:shadow">
                                <ul id="subHomeTeam` + matchId + `" class="flex flex-col items-start w-full">
                                </ul>
                                <ul id="subAwayTeam` + matchId + `" class="flex flex-col items-end w-full bg-white">
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                        `
                    );

                    for (let i = 0; i < Object.keys(response["homeTeam"]["field"]).length; i -= -1)
                    {
                        // $("#lineUpHomeTeam" + response["matchId"]).append(
                        //     `
                        //     <li class="flex items-center justify-start w-full p-1 text-sm">
                        //         <span class="w-2/12 p-1 text-center">` + response["homeTeam"]["field"][i]["jerseyNumber"] + `</span>
                        //         <img class="w-8 h-8 mr-1 bg-gray-100 rounded-full" src="` + response["homeTeam"]["field"][i]["player"]["imageUrl"] + `" alt="` + response["homeTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + `">
                        //         <span id="player" data-title='` + response["homeTeam"]["field"][i]["player"]["translations"]["name"]["EN"] + playerType(response["homeTeam"]["field"][i]["type"]) + `' data-placement="top" class="p-1 truncate">` + response["homeTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + playerType(response["homeTeam"]["field"][i]["type"]) + `</span>
                        //     </li>
                        //     `
                        // );

                        $("#lineUpHomeTeam" + response["matchId"]).append(
                            `
                                <li id="player" data-title='` + response["homeTeam"]["field"][i]["player"]["translations"]["name"]["EN"] + `' data-placement="bottom" class="absolute flex flex-col items-center justify-center h-6 transform -translate-x-1/2 filter drop-shadow" style="left: calc(` + response["homeTeam"]["field"][i]["fieldCoordinate"]["x"] + `% / 10); top: calc(` + response["homeTeam"]["field"][i]["fieldCoordinate"]["y"] + `% / 10);">
                                    <div class="relative flex">
                                        <img class="w-8 h-8 xl:h-10 xl:w-10 rounded-full shadow" src="` + response["homeTeam"]["field"][i]["player"]["imageUrl"] + `" alt="` + response["homeTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + `">
                                        ` + captain(response["homeTeam"]["field"][i]["type"]) + `
                                        <span class="absolute top-0 right-0 transform -translate-y-0.5 translate-x-0.5 flex items-center justify-center w-3 h-3 text-xs text-white rounded-full bg-cyanEU">` + response["homeTeam"]["field"][i]["jerseyNumber"] + `</span>
                                    </div>
                                    <div class="text-xs text-center">` + response["homeTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + playerType(response["homeTeam"]["field"][i]["type"]) + `</div>
                                </li>
                            `
                        );
                        toolTip('#player');
                    }

                    for (let i = 0; i < Object.keys(response["homeTeam"]["bench"]).length; i -= -1)
                    {
                        $("#subHomeTeam" + response["matchId"]).append(
                            `
                            <li class="flex items-center justify-start w-full p-1 text-sm">
                                <span class="w-2/12 p-1 text-center">` + response["homeTeam"]["bench"][i]["jerseyNumber"] + `</span>
                                <img class="w-8 h-8 mr-1 bg-gray-100 rounded-full" src="` + response["homeTeam"]["bench"][i]["player"]["imageUrl"] + `" alt="` + response["homeTeam"]["bench"][i]["player"]["translations"]["shortName"]["EN"] + `">
                                <span id="player" data-title='` + response["homeTeam"]["bench"][i]["player"]["translations"]["name"]["EN"] + playerType(response["homeTeam"]["bench"][i]["type"]) + `' data-placement="top" class="p-1 truncate">` + response["homeTeam"]["bench"][i]["player"]["translations"]["shortName"]["EN"] + playerType(response["homeTeam"]["bench"][i]["type"]) + `</span>
                            </li>
                            `
                        );

                        toolTip('#player');
                    }
                    
                    for (let i = 0; i < Object.keys(response["awayTeam"]["field"]).length; i -= -1)
                    {
                        // $("#lineUpAwayTeam" + response["matchId"]).append(
                        //     `
                        //     <li class="flex items-center justify-end w-full p-1 text-sm">
                        //         <span id="player" data-title='` + playerType(response["awayTeam"]["field"][i]["type"]) + response["awayTeam"]["field"][i]["player"]["translations"]["name"]["EN"] + `' data-placement="top" class="p-1 text-right truncate">` + playerType(response["awayTeam"]["field"][i]["type"]) + response["awayTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + `</span>
                        //         <img class="w-8 h-8 mr-1 bg-gray-100 rounded-full" src="` + response["awayTeam"]["field"][i]["player"]["imageUrl"] + `" alt="` + response["awayTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + `">
                        //         <span class="w-2/12 p-1 text-center">` + response["awayTeam"]["field"][i]["jerseyNumber"] + `</span>
                        //     </li>
                        //     `
                        // );

                        $("#lineUpAwayTeam" + response["matchId"]).append(
                            `
                                <li id="player" data-title='` + response["awayTeam"]["field"][i]["player"]["translations"]["name"]["EN"] + `' data-placement="bottom" class="absolute flex flex-col items-center justify-center h-6 transform rotate-180 -translate-x-1/2 filter drop-shadow text-shadow" style="left: calc(` + response["awayTeam"]["field"][i]["fieldCoordinate"]["x"] + `% / 10); top: calc(` + response["awayTeam"]["field"][i]["fieldCoordinate"]["y"] + `% / 10);">
                                    <div class="relative flex">
                                        <img class="w-8 h-8 xl:h-10 xl:w-10 rounded-full shadow" src="` + response["awayTeam"]["field"][i]["player"]["imageUrl"] + `" alt="` + response["awayTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + `">
                                        ` + captain(response["awayTeam"]["field"][i]["type"]) + `
                                        <span class="absolute top-0 right-0 transform -translate-y-0.5 translate-x-0.5 flex items-center justify-center w-3 h-3 text-xs text-white rounded-full bg-cyanEU">` + response["awayTeam"]["field"][i]["jerseyNumber"] + `</span>
                                    </div>
                                    <div class="text-xs text-center">` + response["awayTeam"]["field"][i]["player"]["translations"]["shortName"]["EN"] + playerType(response["homeTeam"]["field"][i]["type"]) + `</div>
                                </li>
                            `
                        );
                        toolTip('#player');
                    }
                    
                    for (let i = 0; i < Object.keys(response["awayTeam"]["bench"]).length; i -= -1)
                    {
                        $("#subAwayTeam" + response["matchId"]).append(
                            `
                            <li class="flex items-center justify-end w-full p-1 text-sm">
                                <span id="player" data-title='` + playerType(response["awayTeam"]["bench"][i]["type"]) + response["awayTeam"]["bench"][i]["player"]["translations"]["name"]["EN"] + `' data-placement="top" class="p-1 text-right truncate">` + playerType(response["awayTeam"]["bench"][i]["type"]) + response["awayTeam"]["bench"][i]["player"]["translations"]["shortName"]["EN"] + `</span>
                                <img class="w-8 h-8 mr-1 bg-gray-100 rounded-full" src="` + response["awayTeam"]["bench"][i]["player"]["imageUrl"] + `" alt="` + response["awayTeam"]["bench"][i]["player"]["translations"]["shortName"]["EN"] + `">
                                <span class="w-2/12 p-1 text-center">` + response["awayTeam"]["bench"][i]["jerseyNumber"] + `</span>
                            </li>
                            `
                        );
                        toolTip('#player');
                        $("#load").empty();
                    }
                    
                }, 1);
                }
                getScore(matchId);
            });
        }
        else
        {
            swal("Lineup not available");
        }
    }
}

function getScore(matchId)
{
    getTimeLine(matchId);
    var empty = false;
    var eventPlayer;
    var eventTime;
    var eventTeam;
    var goalType;
    var awayTeamId;
    $.ajax({
        url: 'https://match.uefa.com/v3/matches/'+ matchId,
        dataType: 'json',
        type: 'GET',
    }).done(function(response) {
        // console.log(".event" + matchId);
        awayTeamId = response["awayTeam"]["id"];
        if(response["playerEvents"])
        {
            if(empty == false)
            {
                $(".event" + matchId).empty();
                empty = true;
            }
            if(response["playerEvents"]["scorers"])
            {
                for (let i = 0; i < Object.keys(response["playerEvents"]["scorers"]).length; i -= -1)
                {
                    if(response["playerEvents"]["scorers"][i]["time"]["minute"]["injury"])
                        {
                            eventTime = response["playerEvents"]["scorers"][i]["time"]["minute"] + "+" + response["playerEvents"]["scorers"][i]["time"]["injuryMinute"] + "'";
                        }
                        else
                        {
                            eventTime = response["playerEvents"]["scorers"][i]["time"]["minute"] + "'";
                        }
                    eventPlayer = response["playerEvents"]["scorers"][i]["player"]["translations"]["name"]["EN"];
                    eventTime = response["playerEvents"]["scorers"][i]["time"]["minute"] + "'";
                    
                    
                    if(response["playerEvents"]["scorers"][i]["goalType"] == "OWN_GOAL")
                    {
                        goalType = " (OG)";
                        if(response["playerEvents"]["scorers"][i]["teamId"] == awayTeamId)
                        {
                            eventTeam = `
                                <div class="flex items-center justify-start px-2 py-1 border-t">
                                    <img class="w-5 h-5 mx-1" src="https://ssl.gstatic.com/onebox/sports/soccer_timeline/soccer-ball-retina.png" alt="Goal">
                                    <span class="flex items-center h-6">` + eventPlayer + ` ` + eventTime + goalType +`</span>
                                </div>
                            `;
                        }
                        else
                        {
                            eventTeam = `
                                <div class="flex items-center justify-end px-2 py-1 border-t">
                                    <span class="flex items-center h-6">` + eventPlayer + ` ` + eventTime + goalType +`</span>
                                    <img class="w-5 h-5 mx-1" src="https://ssl.gstatic.com/onebox/sports/soccer_timeline/soccer-ball-retina.png" alt="Goal">
                                </div>
                            `;
                        }
                    }
                    else if(response["playerEvents"]["scorers"][i]["goalType"] == "PENALTY_GOAL")
                    {
                        goalType = " (P)"
                        if(response["playerEvents"]["scorers"][i]["teamId"] == awayTeamId)
                        {
                            eventTeam = `
                                <div class="flex items-center justify-end px-2 py-1 border-t">
                                    <span class="flex items-center h-6">` + eventPlayer + ` ` + eventTime + goalType +`</span>
                                    <img class="w-5 h-5 mx-1" src="https://ssl.gstatic.com/onebox/sports/soccer_timeline/soccer-ball-retina.png" alt="Goal">
                                </div>
                            `;
                        }
                        else
                        {
                            eventTeam = `
                                <div class="flex items-center justify-start px-2 py-1 border-t">
                                    <img class="w-5 h-5 mx-1" src="https://ssl.gstatic.com/onebox/sports/soccer_timeline/soccer-ball-retina.png" alt="Goal">
                                    <span class="flex items-center h-6">` + eventPlayer + ` ` + eventTime + goalType +`</span>
                                </div>
                            `;
                        }
                    }
                    else
                    {
                        goalType = ""
                        if(response["playerEvents"]["scorers"][i]["teamId"] == awayTeamId)
                        {
                            eventTeam = `
                                <div class="flex items-center justify-end px-2 py-1 border-t">
                                    <span class="flex items-center h-6">` + eventPlayer + ` ` + eventTime + goalType +`</span>
                                    <img class="w-5 h-5 mx-1" src="https://ssl.gstatic.com/onebox/sports/soccer_timeline/soccer-ball-retina.png" alt="Goal">
                                </div>
                            `;
                        }
                        else
                        {
                            eventTeam = `
                                <div class="flex items-center justify-start px-2 py-1 border-t">
                                    <img class="w-5 h-5 mx-1" src="https://ssl.gstatic.com/onebox/sports/soccer_timeline/soccer-ball-retina.png" alt="Goal">
                                    <span class="flex items-center h-6">` + eventPlayer + ` ` + eventTime + goalType +`</span>
                                </div>
                            `;
                        }
                    }
                    eventType = "Goal";
                    $(".event" + matchId).append(eventTeam);
                    // console.log(eventType + ": " + eventPlayer + " " + eventTime + " " + goalType);
                }
            }
            if(response["playerEvents"]["redCards"])
            {
                if(empty == false)
                {
                    $(".event" + matchId).empty();
                    empty = true;
                }
                for (let i = 0; i < Object.keys(response["playerEvents"]["redCards"]).length; i -= -1)
                {
                    eventPlayer = response["playerEvents"]["redCards"][i]["player"]["translations"]["name"]["EN"];
                    eventTime = response["playerEvents"]["redCards"][i]["time"]["minute"] + "'";
                    
                    if(response["playerEvents"]["redCards"][i]["teamId"] == awayTeamId)
                    {
                        eventTeam = `
                                <div class="flex items-center justify-end px-2 py-1 border-t">
                                    <span class="flex items-center h-6">` + eventPlayer + ` ` + eventTime + `</span>
                                    <img class="w-5 h-5 mx-1" src="assets/images/red-card.svg" alt="Red Card">
                                </div>
                            `;
                    }
                    else
                    {
                        eventTeam = `
                                <div class="flex items-center justify-start px-2 py-1 border-t">
                                    <img class="w-5 h-5 mx-1" src="assets/images/red-card.svg" alt="Red Card">
                                    <span class="flex items-center h-6">` + eventPlayer + ` ` + eventTime + `</span>
                                </div>
                            `;
                    }
                    eventType = "Red Card";
                    $(".event" + matchId).append(eventTeam);
                    // console.log(eventType + ": " + eventPlayer + eventTime + " " + goalType);
                }
            }
        }
    });
}


function getTimeLine(matchId)
{
    var timeLine;
    var score;
    var time;
    var subType;
    var secondaryActor;
    var primaryActor;
    $.ajax({
        url: 'https://match.uefa.com/v2/matches/' + matchId + '/events?filter=LINEUP&offset=0&limit=100',
        dataType: 'json',
        type: 'GET',
    }).done(function(response) {
        $(".timeline" + matchId).empty();

        if(Object.keys(response).length == 0)
        {
            $(".timeline" + matchId).html(`<div class="text-center pb-3">Timeline not available</div>`);
            
        }
        else
        {
            for(let i = 0; i < Object.keys(response).length; i++)
            {
            
                if(response[i]["time"]["injuryMinute"])
                {
                    time = response[i]["time"]["minute"] + " +" + response[i]["time"]["injuryMinute"];
                }
                else
                {
                    time = response[i]["time"]["minute"];
                }
                if(response[i]["type"] == "SUBSTITUTION")
                {
                    timeLine = 
                    `
                    <li class="flex flex-col px-4 mb-3 rounded-lg shadow">
                        <div class="flex py-2">
                            <div class="py-1"><img class="w-5 h-5" src="assets/images/sub.svg" alt=""></div>
                            <div class="flex-grow px-2 py-1 font-bold uppercase">Substitution</div>
                            <div class="py-1">` + time + `'</div>
                        </div>
                        <div class="py-1 my-1 border-t">
                            <div class="text-green-600 uppercase font-bold">IN</div>
                            <div class="flex items-center">
                                <div class="flex flex-col flex-grow">
                                <div class="capitalize">` + response[i]["secondaryActor"]["person"]["translations"]["name"]["EN"] + `</div>
                                    <div class="flex items-center text-gray-500">
                                    <img class="h-4 mr-1" src="` + response[i]["secondaryActor"]["team"]["bigLogoUrl"] + `" alt="">
                                        <div class="mr-1">` + response[i]["secondaryActor"]["team"]["internationalName"] + `</div>
                                    </div>
                                </div>
                                <div>
                                    <img class="w-10 h-10 rounded-full shadow" src="` + response[i]["secondaryActor"]["person"]["imageUrl"] + `" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="py-1 my-1 border-t">
                            <div class="text-red-600 uppercase font-bold">OUT</div>
                            <div class="flex items-center">
                                <div class="flex flex-col flex-grow">
                                    <div class="capitalize">` + response[i]["primaryActor"]["person"]["translations"]["name"]["EN"] + `</div>
                                    <div class="flex items-center text-gray-500">
                                        <img class="h-4 mr-1" src="` + response[i]["primaryActor"]["team"]["bigLogoUrl"] + `" alt="">
                                        <div class="mr-1">` + response[i]["primaryActor"]["team"]["internationalName"] + `</div>
                                    </div>
                                </div>
                                <div>
                                    <img class="w-10 h-10 rounded-full shadow" src="` + response[i]["primaryActor"]["person"]["imageUrl"] + `" alt="">
                                </div>
                            </div>
                        </div>
                    </li>
                    `
                    $(".timeline" + matchId).append(timeLine);
                }
                else if(response[i]["type"] == "YELLOW_CARD")
                {
                    timeLine = 
                    `
                        <li class="flex flex-col px-4 mb-3 rounded-lg shadow">
                            <div class="flex py-2">
                                <div class="py-1"><img class="w-5 h-5" src="assets/images/yellow-card.svg" alt=""></div>
                                <div class="flex-grow px-2 py-1 font-bold uppercase">yellow card</div>
                                <div class="py-1">` + time + `'</div>
                            </div>
                            <div class="py-1 my-1 border-t">
                                <div class="flex items-center">
                                    <div class="flex flex-col flex-grow">
                                        <div class="capitalize">` + response[i]["primaryActor"]["person"]["translations"]["name"]["EN"] + `</div>
                                        <div class="flex items-center text-gray-500">
                                            <img class="h-4 mr-1" src="` + response[i]["primaryActor"]["team"]["bigLogoUrl"] + `" alt="">
                                            <div class="mr-1">` + response[i]["primaryActor"]["team"]["internationalName"] + `</div>    
                                        </div>
                                    </div>
                                    <div>
                                        <img class="w-10 h-10 rounded-full shadow" src="` + response[i]["primaryActor"]["person"]["imageUrl"] + `" alt="">
                                    </div>
                                </div>
                            </div>
                        </li>
                    `
                    $(".timeline" + matchId).append(timeLine);
                }
                else if(response[i]["type"] == "RED_CARD")
                {
                    timeLine = 
                    `
                        <li class="flex flex-col px-4 mb-3 rounded-lg shadow">
                            <div class="flex py-2">
                                <div class="py-1"><img class="w-5 h-5" src="assets/images/red-card.svg" alt=""></div>
                                <div class="flex-grow px-2 py-1 font-bold uppercase">red card</div>
                                <div class="py-1">` + time + `'</div>
                            </div>
                            <div class="py-1 my-1 border-t">
                                <div class="flex items-center">
                                    <div class="flex flex-col flex-grow">
                                        <div class="capitalize">` + response[i]["primaryActor"]["person"]["translations"]["name"]["EN"] + `</div>
                                        <div class="flex items-center text-gray-500">
                                            <img class="h-4 mr-1" src="` + response[i]["primaryActor"]["team"]["bigLogoUrl"] + `" alt="">
                                            <div class="mr-1">` + response[i]["primaryActor"]["team"]["internationalName"] + `</div>    
                                        </div>
                                    </div>
                                    <div>
                                        <img class="w-10 h-10 rounded-full shadow" src="` + response[i]["primaryActor"]["person"]["imageUrl"] + `" alt="">
                                    </div>
                                </div>
                            </div>
                        </li>
                    `
                    $(".timeline" + matchId).append(timeLine);
                }
                else if(response[i]["type"] == "RED_YELLOW_CARD")
                {
                    timeLine = 
                    `
                        <li class="flex flex-col px-4 mb-3 rounded-lg shadow">
                            <div class="flex py-2">
                                <div class="py-1"><img class="w-5 h-5" src="assets/images/yellow-to-red-card.svg" alt=""></div>
                                <div class="flex-grow px-2 py-1 font-bold uppercase">red card</div>
                                <div class="py-1">` + time + `'</div>
                            </div>
                            <div class="py-1 my-1 border-t">
                                <div class="flex items-center">
                                    <div class="flex flex-col flex-grow">
                                        <div class="capitalize">` + response[i]["primaryActor"]["person"]["translations"]["name"]["EN"] + `</div>
                                        <div class="flex items-center text-gray-500">
                                            <img class="h-4 mr-1" src="` + response[i]["primaryActor"]["team"]["bigLogoUrl"] + `" alt="">
                                            <div class="mr-1">` + response[i]["primaryActor"]["team"]["internationalName"] + `</div>    
                                        </div>
                                    </div>
                                    <div>
                                        <img class="w-10 h-10 rounded-full shadow" src="` + response[i]["primaryActor"]["person"]["imageUrl"] + `" alt="">
                                    </div>
                                </div>
                            </div>
                        </li>
                    `
                    $(".timeline" + matchId).append(timeLine);
                }
                else if(response[i]["type"] == "GOAL")
                {
                    if(response[i]["subType"])
                    {
                        if(response[i]["subType"] == "OWN_GOAL")
                        {
                            subType = " (OG)";
                        }
                        else if (response[i]["subType"] == "PENALTY_GOAL")
                        {
                            subType = " (P)";
                        }
                    }
                    else
                    {
                        subType = "";
                    }
                    if(response[i]["totalScore"])
                    {
                        score = response[i]["totalScore"]["home"] + " - " + response[i]["totalScore"]["away"];
                    }
                    else
                    {
                        score = "";
                    }
                    timeLine = 
                    `
                        <li class="flex flex-col px-4 mb-3 rounded-lg shadow">
                            <div class="flex flex-col items-center rounded-t-lg py-2 -mx-4 text-xl text-white bg-center bg-cover shadow" style="background-image: url('https://img.uefa.com/imgml/uefacom/euro2020/body-bg.jpg');">
                                <div class="py-1"><img class="w-8 h-8" src="assets/images/goal.svg" alt=""></div>
                                <div class="flex-grow px-2 py-1 uppercase" id="title">G O O O A A A L L L ! ! !</div>
                                <div class="py-1">` + time + `'` + subType + `</div>
                            </div>
                            <div class="flex items-center justify-center py-3 border-t">
                                <div class="w-2/12 font-bold text-center">` + score + `</div>
                            </div>
                            <div class="py-1 my-1 border-t">
                                <div class="flex items-center">
                                    <div class="flex flex-col flex-grow">
                                        <div class="capitalize">` + response[i]["primaryActor"]["person"]["translations"]["name"]["EN"] + `</div>
                                        <div class="flex items-center text-gray-500">
                                            <img class="h-4 mr-1" src="` + response[i]["primaryActor"]["team"]["bigLogoUrl"] + `" alt="">
                                            <div class="mr-1">` + response[i]["primaryActor"]["team"]["internationalName"] + `</div>    
                                        </div>
                                    </div>
                                    <div>
                                        <img class="w-10 h-10 rounded-full shadow" src="` + response[i]["primaryActor"]["person"]["imageUrl"] + `" alt="">
                                    </div>
                                </div>
                            </div>
                        </li>
                    `
                    $(".timeline" + matchId).append(timeLine);
                }
            }
        }
    });
}

    
// event https://match.uefa.com/v2/matches/2024456/events?filter=LINEUP&offset=0&limit=100&order=ASC
// team https://comp.uefa.com/v1/teams/135,57166
// league https://comp.uefa.com/v1/competitions/3
// line up https://match.uefa.com/v3/matches/2029498/lineups
// match https://data-card.uefa.com/v1/form-guide?matchId=2024448&numberOfMatches=5
// all team https://comp.uefa.com/v1/competitions/3/teams
// eu20 https://comp.uefa.com/v2/teams?competitionId=3&seasonYear=2020&limit=100&offset=0

// group https://standings.uefa.com/v1/standings?competitionId=3&seasonYear=2020

// live https://broadcaster.uefa.com/v1/broadcasters?offset=0&limit=100&countryCode=VN