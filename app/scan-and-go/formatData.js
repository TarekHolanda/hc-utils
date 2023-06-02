export function formatData(fileRow) {
    let dataTemp = {
        "description": fileRow.description,
        "action": fileRow.action,
        "module": fileRow.module,
        "data": {}
    };

    if (fileRow["data/pestCategory"]) {
        dataTemp.data.pestCategory = parseInt(fileRow["data/pestCategory"]);
    }

    if (fileRow["data/crew"]) {
        dataTemp.data.crew = parseInt(fileRow["data/crew"]);
    }

    if (fileRow["data/crop"]) {
        dataTemp.data.cropVariety = parseInt(fileRow["data/crop"]);
    }

    if (fileRow["data/equipment"]) {
        dataTemp.data.equipment = parseInt(fileRow["data/equipment"]);
    }

    if (fileRow["data/locations/level"] && fileRow["data/locations/id"]) {
        dataTemp.data.locations = [{
            level: fileRow["data/locations/level"],
            id: parseInt(fileRow["data/locations/id"]),
        }];
    }

    if (fileRow["data/questions/code"] && fileRow["data/questions/answer"]) {
        dataTemp.data.questions = [{
            code: parseInt(fileRow["data/questions/code"]),
            answer: fileRow["data/questions/answer"],
        }];
    }

    let i = 1;
    for (const [key, value] of Object.entries(fileRow)) {
        if (key === "data/questions/code_" + i && value) {
            dataTemp.data.questions.push({
                code: parseInt(fileRow[key]),
                answer: fileRow["data/questions/answer_" + i],
            });
            i++;
        }
    }

    return dataTemp;
}
