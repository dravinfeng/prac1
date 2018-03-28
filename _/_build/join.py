#!/usr/bin/python3
import sys,os,shutil
_corePath=os.path.abspath('')+'/../'
_path=os.path.abspath('')+'/../../'
projectPath=""

def _joinFile(file,ls):
    global projectPath
    strs=[]
    if not os.path.isfile(file):
        return ""
    fileTemp=open(file,mode='r',encoding='utf-8')
   
    
    for i in fileTemp.readlines():
        if i.find('$Import(')!=-1:

            i=i.split('(')[1].split(')')[0].replace('"','').replace("'",'').replace('.','/')+'.js'

            if i.find('core/')==0:
                i=_corePath+i
            else:
                i=projectPath+i
            if ls.count(i)==0:
                ls.append(i)
                strs.append(_joinFile(i,ls))
        else:
            strs.append(i)

    fileTemp.close()

    return ''.join(strs)+'\n'
def joinFile(conf):

    if not conf:
        print('error:no path or ')
        return
    print('\n========= clearing the old **-srclist.js,please waite... =========\n')
    try:
        os.remove(conf+'/config')
    except:
        print('')
    if(needCompiling==1):
        config=open(conf+'/config',mode='w',encoding='utf-8')
    for root,dirs,files in os.walk(conf):
        for fn in files:
            fn=root+'/'+fn
            if fn.find('-srclist.js')!=-1 and fn.find('.svn')==-1:
                os.remove(fn)
    print('all clear~')
    print('\n========= making the  **-srclist.js,please waite... =========\n')
    for root,dirs,files in os.walk(conf):
        for fn in files:
            Global_ls=[]
            fn=root+'/'+fn
            if fn.find('.svn')==-1 and fn.find('.js')!=-1:
              
                fl=_joinFile(fn,Global_ls)
                tt=fn.split('.js')

                _tempFile=open(tt[0]+'-srclist.js',mode='w',encoding='utf-8')
                _tempFile.writelines(fl)
                del fl
                if(needCompiling==1):
                    config.writelines(_tempFile.name+'\n')
                print(_tempFile.name)
                _tempFile.close()
    if(needCompiling==1):
        config.close()
    print('\n========= done all success ~^@^~ =========\n')


print("do you need compiling the **-srclist.js ? yes or not (y|n)")
needCompiling=input()
if(needCompiling=='y' or needCompiling=='yes'):
    needCompiling=1

projectPath=_path+'/js/'
if __name__=="__main__":

    joinFile(projectPath+'conf')
else:
    joinFile(projectPath+'conf')
if(needCompiling==1):
    print('\nDo remember after joining the js,you need to run the nodejs to compiling it \n')
print('Press "Enter" to continue...')
input()
