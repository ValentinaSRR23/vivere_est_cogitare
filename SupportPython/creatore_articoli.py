
import json

def openfile(name):

    f = open(name, "r")
    t = f.read()
    f.close()
    return t

def writefile(name, content):
    f = open(name, "w")
    f.write(content)
    f.close()
    return f



def aggregate(result,setting, data, isContent):

    if(setting == ""):
        return result

    isList = False

    if(setting == "image_slide"):
        isList = True
        data = data.split(" ")
        while '' in data:
            data.remove('')

    if(not isList):
        data = data.strip()


    if(not isContent):
        result[setting] = data
    else:
        result["content"].append({"type": setting, "value": data})

    return result


def processElement(element):

    rows = element.split("\n")

    rows_no_emptys = []
    for row in rows:
        if(len(row) > 0):
            rows_no_emptys.append(row)

    if(len(rows_no_emptys) == 0):
        return None

    setting = ""
    data = ""

    result = {}
    result["content"] = []
    isContent = False

    for row in rows_no_emptys:

        if(row == "Category:"):
            result = aggregate(result,setting, data, isContent)
            isContent = False
            data = ""
            setting = "type"
        elif(row == "Title:"):
            result = aggregate(result,setting, data, isContent)
            isContent = False
            data = ""
            setting = "title"
        elif(row == "MainImage:"):
            result = aggregate(result,setting, data, isContent)
            isContent = False
            data = ""
            setting = "preview_image"
        elif(row == "Text:"):
            result = aggregate(result,setting, data, isContent)
            isContent = True
            data = ""
            setting = "text"
        elif(row == "Video:"):
            result = aggregate(result,setting, data, isContent)
            isContent = True
            data = ""
            setting = "video"
        elif(row == "SlideShow:"):
            result = aggregate(result,setting, data, isContent)
            isContent = True
            data = ""
            setting = "image_slide"
        else:
            data += row + " "

    result = aggregate(result,setting, data, isContent)

    return result


def injectJsons(elements):

    javascript = "\n\n//Document autogenerated\n\n"

    javascript += "var DocuVale = [\n"

    for element in elements:

        el = processElement(element)

        if(el != None):
            javascript += json.dumps(el, indent=4, sort_keys=True) + ",\n"

    javascript = javascript[:-2]

    javascript += "];\n"

    return javascript

def main():
    t = openfile("./SupportPython/articoli_di_vale.txt")
    elements = t.split("END_ARTICLE")

    js = injectJsons(elements)

    writefile("./Logics/autogenWorks.js", js)

    print("autogenWorks created!")

if(__name__ == "__main__"):
    main()
