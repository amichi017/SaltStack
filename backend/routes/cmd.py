from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from datetime import datetime, timedelta, timezone
from backend.app import db

# import salt.config
# import salt.client
import asyncio
import subprocess

loop = asyncio.new_event_loop()

# local = salt.client.LocalClient()
#print(local)
bp = Blueprint('cmd',__name__)

responses = {
    'cmd.run':{"account-1.minhala.jce.ac.il":"\r\nWindows IP Configuration\r\n\r\n\r\nEthernet adapter Ethernet:\r\n\r\n   Connection-specific DNS Suffix  . : minhala.jce.ac.il\r\n   Link-local IPv6 Address . . . . . : fe80::1963:bc8:2d97:ee88%6\r\n   IPv4 Address. . . . . . . . . . . : 192.168.3.29\r\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\r\n   Default Gateway . . . . . . . . . : 192.168.3.1","account-4.minhala.jce.ac.il":"\r\nWindows IP Configuration\r\n\r\n\r\nEthernet adapter Ethernet:\r\n\r\n   Connection-specific DNS Suffix  . : minhala.jce.ac.il\r\n   Link-local IPv6 Address . . . . . : fe80::51bf:575:57e1:c92d%10\r\n   IPv4 Address. . . . . . . . . . . : 192.168.3.45\r\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\r\n   Default Gateway . . . . . . . . . : 192.168.3.1",
                        "account-2.minhala.jce.ac.il":"\r\nWindows IP Configuration\r\n\r\n\r\nEthernet adapter Ethernet 2:\r\n\r\n   Connection-specific DNS Suffix  . : c202-13.academy.jce.ac.il\r\n   Link-local IPv6 Address . . . . . : fe80::85d7:7b55:6ec1:fe46%14\r\n   IPv4 Address. . . . . . . . . . . : 192.168.56.1\r\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\r\n   Default Gateway . . . . . . . . . :  192.168.101.129","account-2.minhala.jce.ac.il":"\r\nWindows IP Configuration\r\n\r\n\r\nEthernet adapter Ethernet:\r\n\r\n   Connection-specific DNS Suffix  . : minhala.jce.ac.il\r\n   Link-local IPv6 Address . . . . . : fe80::51bf:575:57e1:c92d%10\r\n   IPv4 Address. . . . . . . . . . . : 192.168.3.45\r\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\r\n   Default Gateway . . . . . . . . . : 192.168.101.129",
                      "account-8.minhala.academy.jce.ac.il":"\r\nMinion did not return. [No response]",
                      "rafi.academy.jce.ac.il":"\r\nMinion did not return. [Not connected]"},
    'test.ping':{"account-1.minhala.jce.ac.il":'true',"account-4.minhala.jce.ac.il":'true'},
    'grains.items':{"account-4.minhala.jce.ac.il":{"SSDs":["\\\\.\\PhysicalDrive0"],"biosversion":"Default System BIOS","cpu_model":"Intel(R) Core(TM) i5-3470 CPU @ 3.20GHz","cpuarch":"AMD64","cwd":"c:\\salt\\bin","disks":["\\\\.\\PhysicalDrive0"],"domain":"minhala.jce.ac.il","fqdn":"ACCOUNT-4.minhala.jce.ac.il","fqdn_ip4":["192.168.3.45"],"fqdn_ip6":["fe80::51bf:575:57e1:c92d%11"],"fqdns":[],"gpus":[],"groupname":"","host":"ACCOUNT-4","hwaddr_interfaces":{"Intel(R) 82579LM Gigabit Network Connection":"74:46:A0:C1:13:2D","Software Loopback Interface 1":":::::"},"id":"account-4.minhala.jce.ac.il","init":"Windows","ip4_interfaces":{"Intel(R) 82579LM Gigabit Network Connection":["192.168.3.45"],"Software Loopback Interface 1":["127.0.0.1"]},"ip6_interfaces":{"Intel(R) 82579LM Gigabit Network Connection":["fe80::51bf:575:57e1:c92d"],"Software Loopback Interface 1":["::1"]},"ip_interfaces":{"Intel(R) 82579LM Gigabit Network Connection":["192.168.3.45","fe80::51bf:575:57e1:c92d"],"Software Loopback Interface 1":["127.0.0.1","::1"]},"ipv4":["127.0.0.1","192.168.3.45"],"ipv6":["::1","fe80::51bf:575:57e1:c92d"],"kernel":"Windows","kernelrelease":"10.0.15063","kernelversion":"10.0.15063","locale_info":{"defaultencoding":"cp1255","defaultlanguage":"he_IL","detectedencoding":"cp1255","timezone":"Jerusalem Daylight Time"},"localhost":"ACCOUNT-4","manufacturer":"Hewlett-Packard","master":"salt.mgmt","mem_total":8136,"motherboard":{"productname":"3397","serialnumber":"TRF344025V"},"nodename":"ACCOUNT-4","num_cpus":4,"num_gpus":0,"os":"Windows","os_family":"Windows","osfinger":"Windows-10","osfullname":"Microsoft Windows 10 Enterprise","osmanufacturer":"Microsoft Corporation","osrelease":"10","osrelease_info":[10],"osservicepack":"null","osversion":"10.0.15063","path":"C:\\ProgramData\\Oracle\\Java\\javapath;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Program Files\\PuTTY\\;C:\\salt;C:\\ProgramData\\chocolatey\\bin;C:\\windows\\system32\\config\\systemprofile\\AppData\\Local\\Microsoft\\WindowsApps;c:\\salt\\bin\\lib\\site-packages\\pywin32_system32;c:\\salt\\bin\\lib\\site-packages\\pywin32_system32","pid":19160,"productname":"HP Compaq Elite 8300 SFF","ps":"tasklist.exe","pythonexecutable":"c:\\salt\\bin\\python.exe","pythonpath":["c:\\salt\\bin\\lib\\site-packages\\git\\ext\\gitdb","c:\\salt\\bin\\lib\\site-packages\\git\\ext\\gitdb","c:\\salt\\bin\\Scripts","c:\\salt\\bin\\python35.zip","c:\\salt\\bin\\DLLs","c:\\salt\\bin\\lib","c:\\salt\\bin","c:\\salt\\bin\\lib\\site-packages","c:\\salt\\bin\\lib\\site-packages\\salt-3000.2-py3.5.egg","c:\\salt\\bin\\lib\\site-packages\\win32","c:\\salt\\bin\\lib\\site-packages\\win32\\lib","c:\\salt\\bin\\lib\\site-packages\\Pythonwin","C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319\\","c:\\salt\\bin\\lib\\site-packages\\gitdb\\ext\\smmap","C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319\\"],"pythonversion":[3,5,4,"final",0],"saltpath":"c:\\salt\\bin\\lib\\site-packages\\salt-3000.2-py3.5.egg\\salt","saltversion":"3000.2","saltversioninfo":[3000,2],"serialnumber":"TRF344025V","server_id":1921478547,"shell":"C:\\windows\\system32\\cmd.exe","timezone":"(UTC+02:00) Jerusalem","username":"SYSTEM","virtual":"physical","windowsdomain":"MINHALA","windowsdomaintype":"Domain","zmqversion":"4.3.1"}}
}
async def run_cmd(*cmd_args):
    '''
    :param list with the command's arguments:
    :return:
    '''
    # kwargs = {'tgt_type':'list'}
    #print(cmd_args)
    cmd_options = ["cmd.run","test.ping","grains.items"]
    # res=local.cmd(*cmd_args,**kwargs)
    # print("wait")
    await asyncio.sleep(3)
    res = []
    cmd_name = cmd_args[1]
    # if cmd_name in cmd_options:
    #     res = responses[cmd_name]
    try:
        res = responses[cmd_name]
    except:
       return ["err"]
    # print("done")
    # print(cmd_args)

    return res

# REAL MINIONS FUNCTION
@bp.route("/get_connected_minions")
@jwt_required
def get_connected_minions():
    """
    :return:
    """
    saltReturns = db.saltReturns
    now = datetime.now(timezone.utc)
    delta = now - timedelta(minutes=5)
    now = now.strftime('%Y%m%d%H%M%S%f')
    delta = delta.strftime('%Y%m%d%H%M%S%f')
    res = ['account-1.minhala.jce.ac.il','account-2.minhala.jce.ac.il','account-3.minhala.jce.ac.il','account-4.minhala.jce.ac.il','account-8.minhala.academy.jce.ac.il','rafi.academy.jce.ac.il','c202-13.academy.jce.ac.il','account-10.minhala.jce.ac.il','account-12.minhala.jce.ac.il','account-9.minhala.jce.ac.il','ans-c-101.academy.jce.ac.il']
    # saltReturns = saltReturns.find({"fun": "test.ping","jid": { "$gte": delta, "$lte": now }}).distinct("minion")
    # for j in saltReturns:
    #     res.append(j)
    return jsonify(result=res)

@bp.route("/saltstack_cmd" ,methods=["POST"])
@jwt_required
def saltstack_cmd():

    if request.is_json:
        func = request.json["func"]
        tgt = request.json["tgt"]
        salt_cmd = request.json["salt_cmd"]
    else:
        func = request.form["func"]
        tgt = request.form["tgt"]
        salt_cmd = request.json["salt_cmd"]


    cmd_args = [tgt,func]
    print(cmd_args)
    if len(salt_cmd) > 0:
        cmd_args.append(salt_cmd)
    res = loop.run_until_complete(run_cmd(*cmd_args))
    return jsonify(res = res)


#@bp.route("/test" ,methods=["GET"])
#@jwt_required
#def test():

    #return local.cmd(['c310-1.academy.jce.ac.il','c310-2.academy.jce.ac.il'],'test.ping', tgt_type='list')


