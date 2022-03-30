/* This example requires Tailwind CSS v2.0+ */
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useParams } from "react-router-dom";
import classNames from "../utils";
import { selectIntegrationByTitle } from "../../store/selectors";
import { useSnapshot } from "valtio";
import _ from "../../store/store";
import Breadcrumbs from "../Breadcrumbs";
import { changeIntegrationEnabled } from "../../store/actions";

export default function Example() {
  const { title } = useParams();

  const integration = selectIntegrationByTitle(useSnapshot(_), title);

  if (!integration) return <div>Not found</div>;

  const breadcrumbs = [
    { name: "Integrations", href: "/integrations" },
    { name: integration.title, href: `/integrations/${integration.title}` },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="bg-white shadow sm:rounded-lg m-12">
        <Switch.Group as="div" className="px-4 py-5 sm:p-6">
          <Switch.Label
            as="h3"
            className="text-lg leading-6 font-medium text-gray-900"
            passive
          >
            {integration.title}
          </Switch.Label>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-xl text-sm text-gray-500">
              <Switch.Description>
                Slack is a workplace collaboration tool that can also send and
                receive event notifications. You can configure notifications to
                be send whenever a lead is edited or a pipeline change occurs.
              </Switch.Description>
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
              <Switch
                checked={integration.enabled}
                onChange={(enabled: boolean) =>
                  changeIntegrationEnabled(integration.title, enabled)
                }
                className={classNames(
                  integration.enabled ? "bg-indigo-600" : "bg-gray-200",
                  "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    integration.enabled ? "translate-x-5" : "translate-x-0",
                    "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  )}
                />
              </Switch>
            </div>
          </div>
        </Switch.Group>
      </div>
    </>
  );
}
