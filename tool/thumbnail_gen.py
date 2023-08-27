import glob, shutil, os
from PIL import Image
import re

root_path = "../src/assets/content/projects_bak"
edited_path = "../src/assets/content/projects"

image_filetypes_to = (".webp", ".avif")
image_filetypes_from = (".png", ".jpg", ".gif", ".jpeg", ".svg")
image_filetypes = image_filetypes_from+image_filetypes_to
filetypes = (".mp4", ".mov", ".avi", ".wmv", ".mp3", ".m4a", ".wav", ".flac")
all_filetypes = filetypes + image_filetypes

folders = (path for path in glob.glob(root_path+"/*/*/*") if not path.endswith(all_filetypes))

shutil.rmtree(edited_path)
for path in folders:
    first = True
    for file in (file for file in glob.glob(path+"/*") if file.endswith(all_filetypes)):
        newfile = re.sub(r'\s',"_",file.replace(root_path, edited_path))
        if not os.path.exists(newfile[:newfile.rindex('/')]):
            os.makedirs(newfile[:newfile.rindex('/')])
        #if file.endswith(filetypes+image_filetypes_to):
        if newfile.endswith(image_filetypes_from):
            Image.open(file).save(newfile[:newfile.rindex('.')]+".webp")
        else:
            shutil.copyfile(file, newfile)
        if first and newfile.endswith(image_filetypes):
            image = Image.open(file)
            left = 0
            top = 0
            right = image.width
            bottom = image.height
            if image.width > image.height:
                left = (image.width - image.height) / 2
                right = left + image.height
            if image.width < image.height:
                top = (image.height - image.width) / 2
                bottom = top + image.width
            thumb = image.crop((int(left), int(top), int(right), int(bottom)))
            thumb.thumbnail((400, 400))
            thumb.save(newfile[:newfile.rindex('/')+1]+"thumbnail.webp")
        first = False
